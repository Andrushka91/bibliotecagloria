import React, { useContext } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'
import { Context as AuthContext } from '../../context/AuthContext'

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext)

  return (
    <SafeAreaView>
      <Text>Account Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  )
}

export default AccountScreen