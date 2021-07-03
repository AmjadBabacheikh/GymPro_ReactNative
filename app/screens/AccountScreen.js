import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import { getMyProfile, getMyImage } from '../../actions/userActions';
import ActivityIndicator from '../components/ActivityIndicator';
const baseUrl = 'http://192.168.43.36:8080';

const menuItems = [
  {
    title: 'Cart',
    icon: {
      name: 'cart',
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CART,
  },
  {
    title: 'Invoices',
    icon: {
      name: 'file',
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.FACTURES,
  },
  {
    title: 'Password',
    icon: {
      name: 'lock',
      backgroundColor: colors.medium,
    },
    targetScreen: routes.PASSWORD,
  },
];

function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector((state) => state.userProfile);
  const { Loading: LoadingProfile, user, error: errorProfile } = userProfile;
  const userImage = useSelector((state) => state.userImage);
  const { Loading: LoadingImage, image, error: errorImage } = userImage;
  const imgFileName = user?.imgFileName;
  // console.log(imgFileName);
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(getMyProfile());
      dispatch(getMyImage());
    }
  }, [dispatch]);
  // const [user, setUser] = useState({
  //   name: 'amjad',
  //   email: 'babacheikhamjad@gmail.com',
  // });
  return (
    <Screen style={styles.screen}>
      {LoadingProfile && LoadingImage ? (
        <ActivityIndicator visible={true} />
      ) : errorProfile ? (
        <Text>{errorProfile}</Text>
      ) : (
        <>
          <View style={styles.container}>
            <ListItem
              title={user?.nom + ' ' + user?.prenom}
              subTitle={user?.cin}
              image={{
                uri: `http://192.168.43.36:8080/api/image/${imgFileName}`,
                // method: 'GET',
                // headers: {
                //   Authorization: `${userInfo}`,
                // },
              }}
              onPress={() => {
                navigation.navigate(routes.PROFILE);
              }}
            />
          </View>
          <View style={styles.container}>
            <FlatList
              data={menuItems}
              keyExtractor={(menuItem) => menuItem.title}
              ItemSeparatorComponent={ListItemSeparator}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  IconComponent={
                    <Icon
                      name={item.icon.name}
                      backgroundColor={item.icon.backgroundColor}
                    />
                  }
                  onPress={() => navigation.navigate(item.targetScreen)}
                />
              )}
            />
          </View>
          <ListItem
            title='Log Out'
            IconComponent={<Icon name='logout' backgroundColor='#ffe66d' />}
            onPress={() => {
              dispatch(logout());
            }}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
