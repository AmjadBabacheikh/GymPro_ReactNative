import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms';

// import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  CIN: Yup.string().required().min(5).label('Cin'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
  firstName: Yup.string().required().min(4).label('FirstName'),
  lastName: Yup.string().required().min(4).label('LastName'),
  phoneNumber: Yup.string().required().min(10).label('phoneNumber'),
});

function RegisterScreen(props) {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState('Homme');
  const [dateNaissance, setDateNaissance] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [loginFailed, setLoginFailed] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;
  const handleSubmit = async ({
    CIN,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }) => {
    dispatch(register(CIN, email, password, firstName, lastName, phoneNumber));
    if (error) {
      setLoginFailed(true);
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <Form
          initialValues={{
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            phoneNumber: '',
            CIN: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error='Invalid email and/or password.'
            visible={loginFailed}
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            // icon='email'
            name='CIN'
            placeholder='Cin'
            // textContentType=''
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            // icon='email'
            name='firstName'
            placeholder=' FirstName'
            // textContentType=''
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            // icon='email'
            name='lastName'
            placeholder='LastName'
            // textContentType=''
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            // icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            // icon='lock'
            name='password'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            // icon='email'
            name='phoneNumber'
            placeholder='PhoneNumber'
            // textContentType=''
          />
          <SubmitButton title='Register' />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 250,
    height: 180,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
