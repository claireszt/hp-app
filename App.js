import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CurrentScreen from './src/screens/CurrentScreen.js';
import BooksScreen from './src/screens/BooksScreen.js';
import HistoryScreen from './src/screens/HistoryScreen.js';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: '#CCD1D9',
            }}
      >
        <Tab.Screen
          name="Home"
          component={CurrentScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size}/>),
          }}
        />
        <Tab.Screen
          name="Books"
          component={BooksScreen}
          options={{
            tabBarLabel: 'Books',
            tabBarIcon: ({ color, size }) => (
                <Icon name="book" color={color} size={size}/>)
          }}
        />
        <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="calendar" color={color} size={size}/>),
                  }}
                />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;