import 'react-native-gesture-handler';

import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './src/screens/0AUTH/supabase';
import Auth from './src/screens/0AUTH/Auth';

import { Session } from '@supabase/supabase-js';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import CurrentScreen from './src/screens/1CurrentScreen/_CurrentScreen';
import BooksScreen from './src/screens/2BooksScreen/_BooksScreen';
import HistoryScreen from './src/screens/3HistoryScreen/HistoryScreen';
import AccountScreen from './src/screens/4AccountScreen/AccountScreen';

import { fetchCurrentData } from './src/utils/supabaseFunctions'

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
    {session && session.user ? 
        (
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
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="user" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
        ) : <Auth /> 
      }
            </PaperProvider>
          </NavigationContainer>
  ) 
}
