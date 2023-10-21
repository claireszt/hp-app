import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import CurrentScreen from './src/screens/1CurrentScreen/_CurrentScreen.js';
import BooksScreen from './src/screens/2BooksScreen/BooksScreen.js';
import HistoryScreen from './src/screens/3HistoryScreen/HistoryScreen.js';

import { fetchCurrentData } from './src/functions/Fetch.js'; 

const Tab = createMaterialBottomTabNavigator();



function Navigation() {
  const [currentBook, setCurrentBook] = useState(null)

  async function fetchData() {
    const { currentBook } = await fetchCurrentData();
    setCurrentBook(currentBook);
  }

  fetchData();

  let bookName = 'Home'
  if (currentBook) { bookName = currentBook.name }

  let bookColor = 'black'
  if (currentBook) { bookColor = currentBook.color }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: bookColor,
    },
  };

  return (
    <NavigationContainer>
            <PaperProvider theme={theme}>
      <Tab.Navigator
        activeColor="white"
        inactiveColor='white'
        labeled={false}
        shifting={true}
        barStyle={{ backgroundColor: bookColor }}
      >
      <Tab.Screen
        name="Home"
        component={CurrentScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
          barStyle:{ backgroundColor: 'red' }
        }}
        
      />
      <Tab.Screen
        name="Settings"
        component={BooksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="book" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </PaperProvider>

    </NavigationContainer>
  );
}

export default Navigation;