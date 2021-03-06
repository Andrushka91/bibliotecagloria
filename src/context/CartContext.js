import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from 'react-native';
import createDataContext from './createDataContext';
import booksApi from '../api/books'
import { v1 as uuid } from 'uuid';

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add_item_cart':
            return action.payload
        case 'fetch_cart_items':
            return action.payload
        case 'update_items_cart':
            return action.payload
        case 'empty_cart':
            return action.payload
        default:
            return state
    }
}

const fetchCartItems = dispatch => async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        const key = email + '_books';
        // console.log("fetchCartItemsKey:", key)
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            const totalPrice = getTotalPrice(JSON.parse(value));
            dispatch({ type: 'fetch_cart_items', payload: { books: JSON.parse(value), totalPrice } })
        } else {
            dispatch({ type: 'fetch_cart_items', payload: [] })
        }
    } catch (err) {
        console.log(err);
    }
}

const emptyCart = dispatch => async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        const key = email + '_books';
        await AsyncStorage.removeItem(key);
        dispatch({ type: 'empty_cart', payload: [] })
    } catch (err) {
        console.log(err);
    }
}

// importData = async () => {
//   try {

//     const keys = await AsyncStorage.getAllKeys();
//     const result = await AsyncStorage.multiGet(keys);
//     console.log(result);
//     await AsyncStorage.clear();
//     // console.log(result);
//   } catch (error) {
//     console.error(error)
//   }
// }

const addItemToCart = (dispatch) => async (book, outOfStockCallBack) => {
    const email = await AsyncStorage.getItem('email');
    const key = email + '_books';
    try {
        const data = await AsyncStorage.getItem(key);
        if (data === null) {
            const books = [];
            books.push(book);
            AsyncStorage.setItem(key, JSON.stringify(books));
            ToastAndroid.show("Carte ad??ugat?? cu success in co??!", ToastAndroid.SHORT);
        } else {
            let books = JSON.parse(data);
            let sameBook, outOfStock;

            books.forEach((e) => {
                if (e._id === book._id) {
                    sameBook = true;
                    if (e.cartQuantity < book.quantity) {
                        outOfStock = false;
                        e.cartQuantity += book.cartQuantity;
                        e.price = e.price + book.price;
                    } else {
                        ToastAndroid.show("Stock epuizat, cartea nu s-a ad??ugat in co??. ??ncearc?? mai tarziu.", ToastAndroid.SHORT);
                        outOfStockCallBack();
                        outOfStock = true;
                        dispatch({ type: 'add_item_cart', payload: books })
                    }
                } else {
                    sameBook = false;
                    outOfStock = false;
                }
            })
            if (sameBook && !outOfStock) {
                await AsyncStorage.setItem(key, JSON.stringify(books));
                ToastAndroid.show("Carte ad??ugat?? cu success in co??!", ToastAndroid.SHORT);
                dispatch({ type: 'add_item_cart', payload: books })
            }
            if (!sameBook) {
                books.push(book);
                await AsyncStorage.setItem(key, JSON.stringify(books));
                ToastAndroid.show("Carte ad??ugat?? cu success in co??!", ToastAndroid.SHORT);
                dispatch({ type: 'add_item_cart', payload: books })
            }
        }
    } catch (err) {
        console.log(err);
    }
}


const updateItemsCart = (dispatch) => async (books) => {
    const email = await AsyncStorage.getItem('email');
    const key = email + '_books';
    try {
        await AsyncStorage.removeItem(key);
        await AsyncStorage.setItem(key, JSON.stringify(books));
        const data = await AsyncStorage.getItem(key);
        const totalPrice = getTotalPrice(JSON.parse(data));
        dispatch({ type: 'update_items_cart', payload: { books: JSON.parse(data), totalPrice } })
    } catch (err) {
        console.log(err);
    }
}

const getTotalPrice = (books) => {
    let totalPrice = 0;
    books.forEach((e) => {
        totalPrice += e.price;
    })
    return totalPrice;
}

const createOrder = (dispatch) => async (items, totalPrice) => {
    const userName = await AsyncStorage.getItem('name');
    const userEmail = await AsyncStorage.getItem('email');
    let cartItems = [];
    items.forEach((item) => {
        cartItems.push({ id: item._id, cartQuantity: item.cartQuantity })
    })

    const orderId = uuid();
    await booksApi.post('/order', { orderId, userName, userEmail, totalPrice, cartItems });

    const key = userEmail + '_books';
    await AsyncStorage.removeItem(key);
    dispatch({ type: 'empty_cart', payload: [] })
}

export const { Provider, Context } = createDataContext(
    cartReducer,
    { addItemToCart, fetchCartItems, emptyCart, createOrder, updateItemsCart },
    []
)