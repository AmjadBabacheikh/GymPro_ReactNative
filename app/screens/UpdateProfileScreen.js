import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import {
  getMyImage,
  getMyProfile,
  updateProfile,
} from '../../actions/userActions';
import {
  USER_UPDATE_PROFILE_RESET,
  USER_PROFILE_RESET,
} from '../../constants/userConstants';
import ActivityIndicator from '../components/ActivityIndicator';
import { TextInput, Checkbox } from 'react-native-paper';
import Button from '../components/Button';

const UpdateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [cin, setCin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateNaissance, setDateNaissance] = useState();
  const [genre, setGenre] = useState();
  const [message, setMessage] = useState(null);
  const [menCheked, setMenCheked] = useState(false);
  const [womenCheked, setWomenCheked] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector((state) => state.userProfile);
  const { Loading: LoadingProfile, user, error: errorProfile } = userProfile;
  const profileUpdate = useSelector((state) => state.profileUpdate);
  const { success } = profileUpdate;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(getMyProfile());
    } else if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch({ type: USER_PROFILE_RESET });
      navigation.goBack();
    } else {
      setFirstName(user.prenom);
      setLastName(user.nom);
      setPhoneNumber(user.telephone);
      setDateNaissance(user.dateNaissance.slice(0, 10));
      setCin(user.cin);
      if (user.genre === 'Homme') {
        setMenCheked(true);
      } else if (user.genre === 'Femme') {
        setWomenCheked(true);
      }
    }
  }, [dispatch, user, navigation, success]);

  const submitHandler = () => {
    dispatch(
      updateProfile(
        firstName,
        lastName,
        phoneNumber,
        dateNaissance,
        genre ? genre : user.genre,
        cin
      )
    );
    // }
  };
  return (
    <Screen style={styles.container}>
      {success && Alert.alert('profil updated')}
      {LoadingProfile ? (
        <ActivityIndicator visible={true} />
      ) : errorProfile ? (
        <Text>{errorProfile}</Text>
      ) : (
        <>
          <Text style={styles.title}>Update Profile</Text>
          <TextInput
            label='Cin'
            value={cin || ''}
            onChangeText={(text) => setCin(text)}
            style={styles.input}
          />
          <TextInput
            label='First Name'
            value={firstName || ''}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            label='Last Name'
            value={lastName || ''}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
          />
          <TextInput
            label='Phone'
            value={phoneNumber || ''}
            onChangeText={(text) => setPhoneNumber(text)}
            style={styles.input}
          />
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxContainer}>
              <Text>Men</Text>
              <Checkbox
                status={menCheked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setMenCheked(!menCheked);
                  setGenre('Homme');
                }}
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <Text>Women</Text>
              <Checkbox
                status={womenCheked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setWomenCheked(!womenCheked);
                  setGenre('Femme');
                }}
              />
            </View>
          </View>
          <Button title='update' onPress={() => submitHandler()} />
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: '20%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    width: '95%',
    marginHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  title: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 23,
    color: colors.dark,
    paddingVertical: 5,
  },
});

export default UpdateProfileScreen;
