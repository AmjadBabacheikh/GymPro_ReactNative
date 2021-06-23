import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Account' component={AccountScreen} />
    <Stack.Screen name='Cart' component={CartScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
