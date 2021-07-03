import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesDetail } from '../../actions/coursActions';
import { createCart, getCart } from '../../actions/userActions';
import { CREATE_CART_RESET } from '../../constants/userConstants';
import { StyleSheet, View, Alert } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import Text from '../components/Text';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Button from '../components/Button';
import colors from '../config/colors';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const { cart } = userCart;
  const serviceDetail = useSelector((state) => state.serviceDetail);
  const { Loading, service, error } = serviceDetail;
  const addCart = useSelector((state) => state.addCart);
  const { Loading: LoadingAdd, success, error: errorAdd } = addCart;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_CART_RESET });
      //naviguer vers cart
    } else dispatch(getCart());
    if (isEmpty(service) || service.id !== serviceId) {
      dispatch(getServicesDetail(serviceId));
    }
  }, [dispatch, serviceId, success]);
  const handleSubmit = () => {
    dispatch(createCart(serviceId, 1));
  };
  return (
    <>
      {/* {LoadingAdd && <ActivityIndicator visible={true} />} */}
      {errorAdd && <Text>{errorAdd}</Text>}
      {success && Alert.alert('Produit bien ajoute a votre panier')}
      {Loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <>
          {!isEmpty(service) && (
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <Title style={styles.description}>
                  {service.service.description}
                </Title>
                <Card.Cover
                  style={{ width: '100%', height: 210 }}
                  source={{ uri: `data:image/png;base64,${service.imgBytes}` }}
                />
                <Card.Content>
                  <View style={styles.details}>
                    <Text>{service.service.prix}DH</Text>
                    <Text>{service.service.duree}mois</Text>
                  </View>
                </Card.Content>
                <Button title='BUT NOW' onPress={handleSubmit} />
              </Card>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.light,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
  },
  description: {
    paddingVertical: 15,
    textAlign: 'center',
  },
  card: {
    paddingVertical: 15,
    borderRadius: 10,
    top: 50,
    justifyContent: 'space-around',
  },
});
