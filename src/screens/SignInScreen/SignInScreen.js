import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-gesture-handler';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS_LOGIN } from '../../consts/colors';
import { Context as AuthContext } from '../../context/AuthContext';
import STYLES from '../../styles/index';
const SignUpScreen = ({ navigation }) => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => clearErrorMessage())
    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView
      style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS_LOGIN.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginTop: 40 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS_LOGIN.dark }}>
            GLORIA
          </Text>
          <Text
            style={{ fontWeight: 'bold', fontSize: 22, color: COLORS_LOGIN.secondary }}>
            DOMINI
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS_LOGIN.dark }}>
            Bine ai revenit,
          </Text>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS_LOGIN.light }}>
            Loghează-te pentru a continu
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail-outline"
              color={COLORS_LOGIN.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput onChangeText={setEmail} placeholder="Email" style={STYLES.input}   autoCapitalize='none' />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS_LOGIN.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Parolă"
              style={STYLES.input}
              secureTextEntry
              onChangeText={setPassword}
              autoCapitalize='none'
            />
          </View>
          <TouchableOpacity onPress={() => { signIn({ email, password }) }}>
            <View style={STYLES.btnPrimary}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                Înainte
              </Text>
            </View>
          </TouchableOpacity>
          {
            state.errorMessage ? (<View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 16, color: 'red' }}>{state.errorMessage}</Text>
            </View>) : null
          }
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={STYLES.line}></View>
            <Text style={{ marginHorizontal: 5, fontWeight: 'bold' }}>SAU</Text>
            <View style={STYLES.line}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={STYLES.btnSecondary}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Conectează-te cu
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../assets/facebook.png')}
              />
            </View>
            <View style={{ width: 10 }}></View>
            <View style={STYLES.btnSecondary}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Conectează-te cu
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../assets/google.png')}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{ color: COLORS_LOGIN.light, fontWeight: 'bold' }}>
            Nu ai cont ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: COLORS_LOGIN.purple, fontWeight: 'bold' }}>
              Înregistrare
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
})

export default SignUpScreen