import { StyleSheet } from 'react-native';
import { COLORS } from "../../consts/colors";

const CartCardStyle = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        bbookRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 66,
        height: 35,
        paddingHorizontal: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    buyBtn: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.purple,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default CartCardStyle;