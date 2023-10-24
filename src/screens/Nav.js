import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text } from 'react-native';

import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import CurrentScreen from './1CurrentScreen/_CurrentScreen';
import BooksScreen from './2BooksScreen/_BooksScreen';
import HistoryScreen from './3HistoryScreen/HistoryScreen';

import { fetchCurrentData } from '../functions/Fetch'

const Tab = createMaterialBottomTabNavigator();

export default function Navigation({ session }) {
  const [currentBook, setCurrentBook] = useState(null);

  async function fetchData() {
    const { currentBook } = await fetchCurrentData();
    setCurrentBook(currentBook);
  }

  useEffect(() => {
    fetchData();
  }, []);

  let bookColor = 'black';
  if (currentBook) { bookColor = currentBook.color; }

  const inactiveColor = '#ffffff4D';

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
