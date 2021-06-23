import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActivityIndicator from '../components/ActivityIndicator';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Text from '../components/Text';
import { getServices, getListCours } from '../../actions/coursActions';
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const servicesList = useSelector((state) => state.servicesList);
  const { Loading, services, error } = servicesList;
  const coursList = useSelector((state) => state.coursList);
  const { Loading: LoadingCourses, cours, error: errorCours } = coursList;
  useEffect(() => {
    dispatch(getServices());
    dispatch(getListCours());
  }, [dispatch]);
  return (
    <>
      {Loading ? (
        <ActivityIndicator visible={true} />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <SafeAreaView>
          <Text style={styles.title}>List Services</Text>
          <ScrollView horizontal>
            {services.map((item) => (
              <View key={item.service.id}>
                <Text style={{ textAlign: 'center' }}>
                  {item.service.description}
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('Service', {
                      serviceId: item.service.id,
                    });
                  }}
                >
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{
                      uri: `data:image/png;base64,${item.imgBytes}`,
                    }}
                  />
                </TouchableHighlight>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
      {LoadingCourses ? (
        <ActivityIndicator visible={true} />
      ) : errorCours ? (
        <Text>{errorCours}</Text>
      ) : (
        <View style={styles.cardContainer}>
          <Text style={styles.title}>List Cours</Text>
          <ScrollView>
            {cours.map((item) => (
              <Card style={styles.card} key={item.cours.id}>
                <Card.Cover
                  style={{ width: '100%', height: 210 }}
                  source={{ uri: `data:image/png;base64,${item.imgBytes}` }}
                />
                <Card.Content>
                  <Title>{item.cours.nomCours}</Title>
                  <Paragraph>{item.cours.description}</Paragraph>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
    marginLeft: 5,
    fontWeight: '400',
  },
});
