import { FontAwesome } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigation } from "react-navigation";
import Card from '../../components/Card/Card';
import { COLORS } from '../../consts/colors';
import { Context as BooksContext } from '../../context/BooksContext';
import styles from './styles';

const width = Dimensions.get('screen').width / 2 - 30;

const BooksListScreen = ({ navigation }) => {
  const categories = ['FAMILIE', 'SPIRITUALITATE', 'SANATATE', 'COPII'];

  const [categoryIndex, selectCategoryIndex] = useState(0);
  const [text, onChangeText] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { state, fetchBooks, searchBook } = useContext(BooksContext);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => fetchBooks())
    return unsub
  }, [navigation])

  const refreshList = (value) => {
    setRefresh(value);
  }


  const CategoryList = ({ navigation }) => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => selectCategoryIndex(index)}>
            <Text style={[styles.categoryText,
            categoryIndex == index && styles.categoryTextSelected]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white
      }}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Bine ai venit la</Text>
          <Text style={{ fontSize: 38, fontWeight: 'bold', color: COLORS.purple }}>Biblioteca Gloria</Text>
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate('CartScreen') }}>
          <Icon name="shopping-cart" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('AccountScreen') }}>
          <FontAwesome name="user-circle-o" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput onChangeText={onChangeText} value={text} placeholder="Search" style={styles.input} />
        </View>
        <TouchableOpacity onPress={() => { searchBook(text, (value) => { refreshList(value) }); }}>
          <View style={styles.sortBtn}>
            <Icon name="sort" size={30} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showVerticalScrollIndicator={false}
        legacyImplementation={true}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => fetchBooks()}
          />
        }
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50
        }}
        numColumns={2}
        data={state}
        renderItem={({ item }) => <Card book={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
};

export default withNavigation(BooksListScreen);