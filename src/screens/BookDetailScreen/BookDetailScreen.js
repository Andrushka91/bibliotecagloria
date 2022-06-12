import { AntDesign } from '@expo/vector-icons';
import { useContext } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import Counter from "react-native-counters";
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../consts/colors";
import { Context as BooksContext } from '../../context/BooksContext';
import { Context as CartContext } from '../../context/CartContext';
import styles from './styles';

const BookDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(BooksContext);
  const { addItemToCart } = useContext(CartContext);

  function addBookAndUpdateList(book) {
    addItemToCart(book);
  }

  const _id = route.params._id
  const book = state.find((t) => t._id === _id)
  const initialPrice = book.price;

  function changeQuantity(number, type) {
    console.log("book.INITIAL-quantity", book.quantity)
    if (type === '-') {
      book.quantity -= 1;
      book.price = book.price - initialPrice;
      console.log("changeQuantity-", book.quantity)
    } else if (type === '+') {
      book.quantity += 1;
      book.price = book.price + initialPrice;
      console.log("changeQuantity+", book.quantity)
    }
  }
  const minusIcon = (isDisabled) => {
    return <AntDesign name="minuscircleo" size={24} color="black" />
  };

  const plusIcon = (isPlusDisabled) => {
    return <AntDesign name="pluscircle" size={24} color="black" />
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} >
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon name="shopping-cart" size={28} onPress={() => navigation.navigate('CartScreen')} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'data:image/jpg;base64,' + book.image.data }} style={{ resizeMode: 'contain', flex: 1, width: 400 }} />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end'
          }}>

        </View>
        <View style={{ marginLeft: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {book.title}
          </Text>
          <View style={styles.priceTag}>
            <Text style={{ marginLeft: 15, color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>€{book.price}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Descriere
          </Text>
          <Text style={{ color: 'grey', fontSize: 16, lineHeight: 22, marginTop: 10 }}>
            {book.description}
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, paddingHorizontal: 20 }}>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Counter start={1} minusIcon={minusIcon} plusIcon={plusIcon} countTextStyle={{ color: COLORS.purple }}
                buttonStyle={{ borderColor: 'transparent' }} onChange={changeQuantity.bind(this)} min={1} />
            </View>
            <TouchableOpacity onPress={() => addBookAndUpdateList(book)}>
              <View style={styles.buyBtn}>
                <Text style={{ color: COLORS.white, fontSize: 16, fontFamily: 'sans-serif-condensed' }}>Adaugă în coș</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withNavigation(BookDetailScreen);