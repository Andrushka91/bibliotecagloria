import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Text, View } from "react-native";
import Counter from "react-native-counters";
import { COLORS } from "../../consts/colors";
import CartCardStyle from './CartCardStyle';

const CartCard = ({ book, onAdd, onSubstract }) => {
    const [initialPrice, setInitialPrice] = useState(0);
   
    useEffect(() => {     
        if (book.cartQuantity > 1) {
            setInitialPrice(book.price / book.cartQuantity);
        } else {
            setInitialPrice(book.price);
        }
        console.log("CartCardTestQuantity:", book.cartQuantity)
    }, [])

    function changeQuantity(number, type) {
        if (type === '-') {
            onSubstract(initialPrice);
        } else if (type === '+') {
            onAdd(initialPrice);
        }
    }

    const minusIcon = (isDisabled) => {
        return <AntDesign name="minuscircleo" style={{ marginEnd: -20 }} size={24} color="black" />
    };

    const plusIcon = (isPlusDisabled) => {
        return <AntDesign name="pluscircle" style={{ marginStart: -20 }} size={24} color="black" />
    };

    return <View style={CartCardStyle.cartCard}>
        <Image
            source={{ uri: book.image }}
            style={{ height: 80, width: 80 }}
        />
        <View style={{ height: 100, marginLeft: 10, paddingVertical: 5, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{book.title}</Text>
            <Text style={{ fontSize: 13, color: 'grey' }}>{book.description}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17, paddingVertical: 10 }}>€{book.price}</Text>
        </View>
        <View style={{ marginEnd: 35 }}>
            <View style={CartCardStyle.actionBtn}>
                <Counter start={book.cartQuantity} minusIcon={minusIcon} plusIcon={plusIcon} countTextStyle={{ color: COLORS.purple }}
                    buttonStyle={{ borderColor: 'transparent' }} onChange={changeQuantity.bind(this)} min={1} max={book.quantity} />
            </View>
        </View>
    </View>;
}

export default CartCard;