import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { StatusBar } from 'native-base';
import { COLORS } from './src/consts/colors';
import { Context as AuthContext, Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as BooksProvider } from './src/context/BooksContext';
import { Provider as CartProvider } from './src/context/CartContext';
import AccountScreen from './src/screens/AccountScreen/AccountScreen';
import BookDetailScreen from './src/screens/BookDetailScreen/BookDetailScreen';
import BookListScreen from './src/screens/BookListScreen/BookListScreen';
import CartScreen from './src/screens/CartScreen/CartScreen';
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import { useFonts } from 'expo-font';
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ header: () => null }}>
  <AuthStack.Screen name="SignIn" component={SignInScreen} />
  <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
)

const AppStack = createStackNavigator();

const AppStackScreen = () => (
  <AppStack.Navigator screenOptions={{ header: () => null }}>
    <AppStack.Screen name="Biblioteca" component={BookListScreen} />
    <AppStack.Screen name="BookDetails" component={BookDetailScreen} />
    <AppStack.Screen name="AccountScreen" component={AccountScreen} />
    <AppStack.Screen name="CartScreen" component={CartScreen} />
  </AppStack.Navigator>
)

const App = () => {
  const { state } = useContext(AuthContext)
  const [loaded] = useFonts({
    AllerLight: require('./src/assets/fonts/AllerLight.ttf'),
  });

  if (!loaded) {
    return null;
  }

  if (state.isLoading) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' backgroundColor={COLORS.dark} />
      {state.token === null ? (
        <AuthStackScreen />
      ) : (
        <AppStackScreen />
      )
      }
    </NavigationContainer>
  )
}

export default () => (
  <AuthProvider>
    <BooksProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </BooksProvider>
  </AuthProvider>
)