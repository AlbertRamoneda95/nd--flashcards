import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DeckList from "./DeckList";
import AddDeck from "./AddDeck";
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createMaterialBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
    barStyle={{ backgroundColor: '#1b262c' }}
    options={{ headerTitle :"hello" }}
    >
      <Tab.Screen name="Decks" styles={{ marginBottom: 5 }} component={DeckList} options={
        { tabBarLabel: "Deck List" },
        {tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-albums" size={20} color="white" tintColor="white" backgroundColor="white"/>
        )}
      }/>
      <Tab.Screen name="Add Deck" styles={{ marginBottom: 5 }} component={AddDeck} options={
         { tabBarLabel: "Add a Deck" },
         {tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-add-circle-outline" size={20} color="white" tintColor="white" backgroundColor="white"/>
        )}
      }/>
    </Tab.Navigator>
  );
}

export default TabNavigator
