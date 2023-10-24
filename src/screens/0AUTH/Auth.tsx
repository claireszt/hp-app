import React, { useState } from 'react'
import { Alert, StyleSheet, View, Image } from 'react-native'
import { supabase } from './supabase'

import { TextInput, Button } from 'react-native-paper';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import Img from '../../utils/images.js'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black'
    },
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Image source={Img['icon']} style={{ justifyContent:'center', alignContent:'center' }} />
        <TextInput
          label="Email"
          mode='outlined'
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="enter your email adress"
          autoCapitalize={'none'}
          activeOutlineColor={theme.colors.primary}
        />
      </View>
      
      <View style={styles.verticallySpaced}>
        <TextInput
          mode='outlined'
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          activeOutlineColor={theme.colors.primary}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          mode='elevated'
          style={{borderRadius:0}}
          disabled={loading}
          onPress={() => signInWithEmail()}
          textColor='black'
          >
          Sign in 
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:'center',
    justifyContent:'center'
  },
  verticallySpaced: {
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:5,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})