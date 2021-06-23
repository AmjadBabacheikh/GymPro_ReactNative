import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';

// const key = 'authToken';

const storeToken = async (key, authToken) => {
  try {
    await AsyncStorage.setItem(key, authToken);
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
};

const getToken = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue;
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
};

// const getUser = async () => {
//   const token = await getToken();
//   return token ? jwtDecode(token) : null;
// };

const removeToken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
};

export { getToken, removeToken, storeToken };
