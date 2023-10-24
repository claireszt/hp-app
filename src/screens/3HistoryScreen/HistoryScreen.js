
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import CreateTableButton, { getListenColumns } from '../../utils/currentListen.js';

export default function HistoryScreen ({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CreateTableButton />
    </View>
  );
}


