import { AntDesign } from '@expo/vector-icons';
import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
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
    if (type === '-') {
      book.cartQuantity -= 1;
      book.price = book.price - initialPrice;
    } else if (type === '+') {
      if (book.cartQuantity <= book.quantity) {
        book.cartQuantity += 1;
        book.price = book.price + initialPrice;
      }
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
        <Image source={{ uri: book.image }} style={{ resizeMode: 'contain', flex: 1, width: 400 }} />
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
            <Text style={{ marginLeft: 15, color: COLORS.white, fontFamily: 'AllerLight', fontSize: 18 }}>€{book.price}</Text>
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
                buttonStyle={{ borderColor: 'transparent' }} onChange={changeQuantity.bind(this)} min={1} max={book.quantity} />
            </View>

            {book.quantity > 0 ? (
              <TouchableOpacity onPress={() => addBookAndUpdateList(book)}>
                <View style={styles.buyBtn}>
                  <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'AllerLight' }}>Adaugă în coș</Text>
                </View>
              </TouchableOpacity>
            ) :
              <View style={styles.outOfStock}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'AllerLight' }}>Stoc epuizat</Text>
              </View>
            }
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withNavigation(BookDetailScreen);