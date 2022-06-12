import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from "../../consts/colors";
const width = Dimensions.get('screen').width / 2 - 30;

const CardStyle = StyleSheet.create({
    card: {
        height: 225,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15
    }
})

export default CardStyle;