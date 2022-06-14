import { StyleSheet } from 'react-native';
import { COLORS } from "../../consts/colors";
const styles = StyleSheet.create({
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    searchContainer: {
      height: 50,
      backgroundColor: COLORS.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.dark,
      flex: 1
    },
    sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      backgroundColor: COLORS.purple,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between'
    },
    categoryText: {
      fontSize: 16,
      color: 'grey',
    },
    categoryTextSelected: {
      color: COLORS.purple,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.purple
    }
  });
  
export default styles;