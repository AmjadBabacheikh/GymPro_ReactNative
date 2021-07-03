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
  TouchableWithoutFeedback,
  Platform,
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
          <Text style={styles.title}>Services List</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            // pagingEnabled
            decelerationRate='fast'
          >
            {services.map((item) => (
              <View key={item.service.id} style={{ paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>
                  {item.service.description}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Service', {
                      serviceId: item.service.id,
                    });
                  }}
                >
                  <Image
                    style={{ width: 150, height: 150, borderRadius: 10 }}
                    source={{
                      uri: `data:image/png;base64,${item.imgBytes}`,
                    }}
                  />
                </TouchableWithoutFeedback>
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
          <Text style={styles.title}>Courses List</Text>
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
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
    marginLeft: 5,
    fontWeight: '400',
    paddingHorizontal: 10,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
  },
});
