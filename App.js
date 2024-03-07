import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { HomeScreen, BookScreen } from './src/screens';
import CustomSidebar from './src/components/CustomSidebar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      border: "transparent"
  }
}

export default function App() {
  return (
    <NavigationContainer 
    // theme={theme}
    >
      <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{headerShown: false}}
      drawerContent={(props) => <CustomSidebar {...props} />}
      >
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Drawer.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Add" component={AddBookScreen} /> */}
        <Drawer.Screen name="Book" component={BookScreen} options={{
            drawerLabel: () => null, // Hide the screen label in the drawer
          }} />
        {/* <Stack.Screen name="More" component={MoreBooks} />
        <Stack.Screen name="Edit" component={EditBook} />
        <Stack.Screen name="Scan" component={Scanner} />
        <Stack.Screen name="ScannedBook" component={ScannedBookScreen} />
        <Stack.Screen name="AtCounter" component={AtCounterPaymentScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
