import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from './createDataContext'
import booksApi from '../api/books'

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'sign_in':
      return { isLoading: false, errorMessage: '', token: action.payload }
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'no_token':
      return { ...state, isLoading: false }
    case 'sign_out':
      return { token: null }
    default:
      return state
  }
}

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: 'sign_in', payload: token })
  } else {
    dispatch({ type: 'no_token' })
  }
}

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' })
}

const signUp = (dispatch) => async ({ name, email, password }) => {
  try {
    const { data } = await booksApi.post('/signup', { name, email, password })
    const user = await booksApi.get('/getUser', { headers: { 'token': data.token } })
    await AsyncStorage.setItem('name', user.data.name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('token', data.token);

    dispatch({ type: 'sign_in', payload: data.token })
  } catch (error) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
  }
}

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const { data } = await booksApi.post('/signin', { email, password })
    const user = await booksApi.get('/getUser', { headers: { 'token': data.token } })
    await AsyncStorage.setItem('name', user.data.name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('token', data.token);
    
    console.log("loginData:", user.data);
    dispatch({ type: 'sign_in', payload: data.token })
  } catch (error) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' })
  }
}

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({ type: 'sign_out' })
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: '', isLoading: true }
)