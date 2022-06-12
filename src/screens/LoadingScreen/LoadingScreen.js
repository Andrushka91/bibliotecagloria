import { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Context } from '../../context/AuthContext';
import styles from './styles';

const LoadingScreen = () => {
  const { tryLocalSignIn } = useContext(Context)

  useEffect(() => {
    tryLocalSignIn()
  }, [])

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}


export default LoadingScreen

