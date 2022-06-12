import { StyleSheet } from 'react-native'
import { COLORS } from "../../consts/colors";

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 7,
        marginTop: 30,
        paddingTop: 30,
        borderRadius: 20
    },

    priceTag: {
        backgroundColor: COLORS.purple,
        width: 80,
        height: 40,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: 'center'
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBtnText: {
        fontWeight: 'bold',
        fontSize: 28
    },
    buyBtn: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.purple,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 16,

    }
});
export default styles;