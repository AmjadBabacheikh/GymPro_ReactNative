import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import { USER_UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { updatePassword } from '../../actions/userActions';
import ActivityIndicator from '../components/ActivityIndicator';
import { TextInput, Checkbox } from 'react-native-paper';
import Button from '../components/Button';

const PasswordScreen = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const passwordUpdate = useSelector((state) => state.passwordUpdate);
  const { passwordSuccess } = passwordUpdate;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (passwordSuccess) {
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
    }
  }, [passwordSuccess]);

  const submitHandler = () => {
    if (password !== confirmPassword) {
      setMessage('passwords does not match');
    } else {
      dispatch(updatePassword(password));
      setPassword('');
      setConfirmPassword('');
    }
  };
  return (
    <Screen style={styles.container}>
      {passwordSuccess && Alert.alert('password updated')}
      {message && Alert.alert({ message })}
      <>
        <Text style={styles.title}>Update Password</Text>
        <TextInput
          label='Password'
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          right={<TextInput.Icon name='eye' />}
        />
        <TextInput
          label='Confirmed Password'
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          right={<TextInput.Icon name='eye' />}
        />
        <Button title='update' onPress={() => submitHandler()} />
      </>
    </Screen>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: '20%',
  },
  input: {
    width: '95%',
    marginHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 15,
  },
  title: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 23,
    color: colors.dark,
    paddingVertical: 5,
  },
});
