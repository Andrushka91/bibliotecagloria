import { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from "react-navigation";
import CartCard from '../../components/CartCard/CartCard';
import { COLORS } from '../../consts/colors';
import { Context as CartContext } from '../../context/CartContext';
import styles from './styles';

const CartScreen = ({ navigation }) => {
    const [isFetching, setIsFetching] = useState(false);

    const { state, fetchCartItems, emptyCart, updateItemsCart } = useContext(CartContext);

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {fetchCartItems() })
        return unsub

    }, [navigation])

    // const fetchData = () => {
    //     setTimeout(function () { fetchCartItems() }, 1000)
    //     fetchCartItems()
    //     setIsFetching(false);
    // };

    // const onRefresh = () => {
    //     setIsFetching(true);
    //     fetchData();
    // };

    const clearCart = () => {
        emptyCart();
    }

    const EmptyListMessage = ({ item }) => {
        return (
            <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
                Nu existe carti in cosul de cumparaturi
            </Text>
        );
    };

    const onAddQuantity = (item, index, initialPrice) => {
        const cartItems = [...state.books];
        cartItems[index].quantity += 1;
        cartItems[index].price = initialPrice * cartItems[index].quantity;
        updateItemsCart(cartItems);
    }

    const onSubstractQuantity = (item, index, initialPrice) => {
        console.log("CartScreenStateOnSub1:")
        const cartItems = [...state.books];
        cartItems[index].quantity -= 1;
        cartItems[index].price -= initialPrice;
        updateItemsCart(cartItems);
    }


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={20} onPress={() => navigation.navigate('Biblioteca')} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={state.books}
                // onRefresh={onRefresh}
                // refreshing={isFetching}
                ListEmptyComponent={EmptyListMessage}
                renderItem={
                    ({ item, index }) =>
                        <CartCard
                            onAdd={(initialPrice) => onAddQuantity(item, index, initialPrice)}
                            onSubstract={(initialPrice) => onSubstractQuantity(item, index, initialPrice)}
                            index={index}
                            book={item}
                        />
                }

                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={
                    () => (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: 15,
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Total
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€{state.totalPrice}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between' }}>
                                <View style={styles.buyBtn}>
                                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Plateste</Text>
                                </View>
                                <TouchableOpacity onPress={() => clearCart()} >
                                    <View style={styles.buyBtn}>
                                        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Goleste cosul</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                }
            />
        </SafeAreaView >
    );
};

export default withNavigation(CartScreen);