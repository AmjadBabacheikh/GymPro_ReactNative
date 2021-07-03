import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { getToken } from './app/auth/storage';
import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';

const Index = () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;
  // //   if (userInfo) setIsLoged(true);
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  const restoreUser = async () => {
    const user = await getToken('userInfo');
    if (user) setUser(user);
  };
  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Index;
