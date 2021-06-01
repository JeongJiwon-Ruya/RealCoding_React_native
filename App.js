import * as React from 'react';
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CityList from './CityList';

const HomeScreen = () => (
  <View style={styles.container}>
    <CityList/>
    <StatusBar style="auto" />
  </View>
);
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
     return (
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen
             name="Home"
             component={HomeScreen}
             options={{ title : 'Cities' }}
           />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
