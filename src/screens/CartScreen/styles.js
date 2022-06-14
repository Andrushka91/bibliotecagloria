import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.purple,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buyBtn: {
        width: 170,
        height: 50,
        backgroundColor: COLORS.purple,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 16,
    },
    emptyListStyle: {
        padding:10,
        fontSize: 18,
        textAlign: 'center',
    },

    emptyListButton:{
        width: 250,
        height: 50,
        backgroundColor: COLORS.purple,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 16,
    }


})
export default styles;