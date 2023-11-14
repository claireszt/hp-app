import React, { useState, useEffect } from "react";
import { supabase } from "./src/screens/0AUTH/supabase";
import Auth from "./src/screens/0AUTH/Auth";

import { Session } from "@supabase/supabase-js";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import CurrentScreen from "./src/screens/1CurrentScreen/_CurrentScreen";
import BooksScreen from "./src/screens/2BooksScreen/_BooksScreen";
import HistoryScreen from "./src/screens/3HistoryScreen/HistoryScreen";
import AccountScreen from "./src/screens/4AccountScreen/AccountScreen";

import { NewCurrentScreen } from "./src/screens/NEWDB/_CurrentScreen";
import { newFetchCurrentData } from "./src/screens/NEWDB/supabaseFunctions";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [color, setColor] = useState("black"); // Initialize with a default color

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, secondaryContainer: color },
        }}
      >
        {session && session.user ? (
          <Tab.Navigator
            activeColor="white"
            inactiveColor="#ffffff4D"
            labeled={false}
            barStyle={{ backgroundColor: color }}
          >
            <Tab.Screen
              name="Home"
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="home" color={color} size={26} />
                ),
              }}
            >
              {() => (
                <NewCurrentScreen
                  initialColor={color}
                  onColorChange={(newColor) => setColor(newColor)}
                />
              )}
            </Tab.Screen>
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
        ) : (
          <Auth />
        )}
      </PaperProvider>
    </NavigationContainer>
  );
}
