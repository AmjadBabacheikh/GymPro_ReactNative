import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { getToken } from './app/auth/storage';
import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';

const Index = () => {
  const [user, setUser] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;
  //   if (userInfo) setIsLoged(true);
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getToken('userInfo');
      if (userInfo) {
        setUser(userInfo);
        // console.log(userInfo);
      }
    };
    fetchUser();
  }, [userInfo]);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
      <StatusBar style='auto' />
    </NavigationContainer>
  );
};

export default Index;
