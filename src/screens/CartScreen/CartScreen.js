import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigation } from "react-navigation";
import CartCard from '../../components/CartCard/CartCard';
import { COLORS } from '../../consts/colors';
import { Context as CartContext } from '../../context/CartContext';
import styles from './styles';

const CartScreen = ({ navigation }) => {
    const [isFetching, setIsFetching] = useState(false);

    const { state, fetchCartItems, emptyCart, createOrder, updateItemsCart } = useContext(CartContext);

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => { fetchCartItems() })
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
            <View style={{
                justifyContent: 'center', alignItems: 'center',
            }}>
                <Image style={{ resizeMode: 'contain', height: 150 }} source={require('../../assets/empty-cart-message.png')} />
                <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
                    Coșul tău este gol
                </Text>
            </View>
        );
    };
    const onAddQuantity = (index, initialPrice) => {
        const cartItems = [...state.books];
        cartItems[index].cartQuantity += 1;
        cartItems[index].price = initialPrice * cartItems[index].cartQuantity;
        updateItemsCart(cartItems);
    }
    const onSubstractQuantity = ( index, initialPrice) => {
        console.log("CartScreenStateOnSub1:")
        const cartItems = [...state.books];
        cartItems[index].cartQuantity -= 1;
        cartItems[index].price -= initialPrice;
        updateItemsCart(cartItems);
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={styles.header}>
                <View style={{ flex: 1, alignItems: 'flex-start', paddingVertical: 3 }}>
                    <Icon name="arrow-back-ios" size={20} onPress={() => navigation.navigate('Biblioteca')} />
                </View>
                <View style={{ flex: 1.2, alignItems: 'baseline' }}>
                    <Text style={{ fontSize: 20, fontFamily: 'AllerLight', fontWeight: 'bold', }}>COȘ</Text>
                </View>
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
                        state.books ?
                            (<View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: 15,
                                    }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Total:
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€{state.totalPrice}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 4, justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={() => createOrder(state.books, state.totalPrice)}>
                                        <View style={styles.buyBtn}>
                                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'AllerLight' }}>Plătește</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => clearCart()}>
                                        <View style={styles.buyBtn}>
                                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'AllerLight' }}>Șterge din coș</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>)
                            : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Biblioteca')}>
                                    <View style={styles.emptyListButton}>
                                        <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'AllerLight' }}>Vezi cărțile disponibile</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

export default withNavigation(CartScreen);