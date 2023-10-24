import React, {useState, useEffect} from 'react';
import { View } from 'react-native';

import { Button } from 'react-native-paper';

import { supabase } from '../0AUTH/supabase'
import { Session } from '@supabase/supabase-js'

const AccountScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onPress={() => supabase.auth.signOut()}
          mode="contained"
          textColor='white'
          uppercase={true}
          theme={{ colors: { primary:'black'} }}
        >
          Sign Out
        </ Button>
    </View>
  );
}

export default AccountScreen;
