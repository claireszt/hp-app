
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import CurrentScreen from './src/screens/1CurrentScreen/_CurrentScreen.js';
import BooksScreen from './src/screens/2BooksScreen/_BooksScreen.js';
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

  let bookColor = 'black'
  if (currentBook) { bookColor = currentBook.color }

  const inactiveColor = '#ffffff4D'

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
        inactiveColor={inactiveColor}
        labeled={false}
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
        name="Books"
        component={BooksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </PaperProvider>

    </NavigationContainer>
  );
}

export default Navigation;