import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import AccountScreen from './src/screens/AccountScreen/AccountScreen';
import BookListScreen from './src/screens/BookListScreen/BookListScreen';
import BookDetailScreen from './src/screens/BookDetailScreen/BookDetailScreen';
import CartScreen from './src/screens/CartScreen/CartScreen';
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen';
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'
import { Provider as BooksProvider } from './src/context/BooksContext'
import { Provider as CartProvider } from './src/context/CartContext'
import { COLORS } from './src/consts/colors';
import { StatusBar } from 'native-base';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ header: () => null }}>
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
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