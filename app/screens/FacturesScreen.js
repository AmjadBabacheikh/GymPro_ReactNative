import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getClientFacture } from '../../actions/userActions';
import ActivityIndicator from '../components/ActivityIndicator';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import { List } from 'react-native-paper';
import colors from '../config/colors';

const LeftContent = (props) => <Avatar.Icon {...props} icon='folder' />;

const FacturesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientListFactures = useSelector((state) => state.clientListFactures);
  const { Loading, factures, error } = clientListFactures;
  useEffect(() => {
    dispatch(getClientFacture());
  }, [dispatch]);
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  return (
    <View>
      {Loading ? (
        <ActivityIndicator visible={true} />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <>
          <FlatList
            data={factures}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <Card>
                <Card.Content>
                  <Title style={{ color: colors.dark }}>
                    Facture N:{item.id}
                  </Title>
                  <Paragraph>Montant {item.facture.montant} DH</Paragraph>
                </Card.Content>
                {item.services.map((service) => (
                  <List.Item
                    key={service.id}
                    title={service.description + ' ' + service.prix + ' DH'}
                    description={service.duree + ' ' + 'mois'}
                    titleStyle={{ color: colors.primary }}
                  />
                ))}
              </Card>
            )}
          />
        </>
      )}
    </View>
  );
};

export default FacturesScreen;

const styles = StyleSheet.create({});
