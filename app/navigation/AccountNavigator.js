import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import FacturesScreen from '../screens/FacturesScreen';
import PasswordScreen from '../screens/PasswordScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Account' component={AccountScreen} />
    <Stack.Screen name='Cart' component={CartScreen} />
    <Stack.Screen name='Profile' component={UpdateProfileScreen} />
    <Stack.Screen name='Factures' component={FacturesScreen} />
    <Stack.Screen name='Password' component={PasswordScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
