import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeItemFromCart } from '../../actions/userActions';
import ActivityIndicator from '../components/ActivityIndicator';
import { ListItem, ListItemSeparator } from '../components/lists';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Button from '../components/Button';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const userCart = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log('la cart est ' + userInfo);
  const { Loading, cart, error } = userCart;
  const clientRemoveItem = useSelector((state) => state.clientRemoveItem);
  const {
    Loading: LoadingDelete,
    successDelete,
    errorDelete,
  } = clientRemoveItem;

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, successDelete]);
  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkCouponHandler = () => {};
  const checkoutHandler = () => {
    // if (userInfo) {
    //   history.push('/shipping');
    // } else {
    //   history.push('/login');
    // }
    navigation.navigate('payment');
  };
  return (
    <Screen>
      {Loading ? (
        <ActivityIndicator visible={true} />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={cart.achatDetails}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Image
                    style={{ width: 180, height: 200, borderRadius: 10 }}
                    source={{
                      uri: `data:image/png;base64,${item.service.imgBytes}`,
                    }}
                  />
                </View>
                <View style={styles.detail}>
                  <Text style={styles.title}>
                    {item.service.service.description}
                  </Text>
                  <Text style={styles.price}>
                    {item.service.service.duree} mois
                  </Text>
                  <View style={styles.actions}>
                    <Text style={styles.price}>
                      {item.service.service.prix}DH
                    </Text>
                    <Icon name='delete' backgroundColor={colors.primary} />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
      <Button title='Apply' />
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  title: {
    paddingBottom: 20,
    fontSize: 18,
  },
  detail: {
    justifyContent: 'space-evenly',
  },
  price: {
    fontWeight: '500',
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
