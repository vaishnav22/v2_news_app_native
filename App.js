import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GeneralScreen from './src/components/GeneralScreen'
import TechScreen from './src/components/TechScreen'
import BusinessScreen from './src/components/BusinessScreen'


console.disableYellowBox = true

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render(){
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="General News"
        tabBarOptions={{
          activeTintColor: '#fff',
          labelStyle: {
            fontSize: 22,
            marginBottom: 12,
            marginTop: 10,
            textAlign: 'center',
            margin: 0,
            padding: 0,
            fontFamily: 'notoserif'
          },
          tabStyle: {
            backgroundColor: '#333'
          }
        }}
      >
        <Tab.Screen 
          name="General News" 
          component={GeneralScreen} 
          options={{
            tabBarLabel: 'General'
            
          }}
        />

        <Tab.Screen 
          name="Technology" 
          component={TechScreen}
          options={{
            tabBarLabel: 'Technology'
          }}
        />

        <Tab.Screen 
          name="Business" 
          component={BusinessScreen} 
          options={{
            tabBarLabel: 'Business'
          }}
        />


      </Tab.Navigator>
    </NavigationContainer>
  );
  }
}

