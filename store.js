import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { setInit } from './actions/userActions';
import { getToken } from './app/auth/storage';
import {
  loginReducer,
  registerReducer,
  userProfileReducer,
  responsablesListReducer,
  clientsListReducer,
  clientInfosReducer,
  employeInfosReducer,
  clientDeleteReducer,
  employeDeleteReducer,
  profileUpdateReducer,
  passwordUpdateReducer,
  coachAddReducer,
  clientAddReducer,
  responsableAddReducer,
  userImageReducer,
  userDeleteImageReducer,
  coachsListReducer,
  addCartReducer,
  cartReducer,
  achatRegleReducer,
  clientRemoveItemReducer,
  clientListFacturesReducer,
  clientsListFacturesAdminReducer,
  detailFactureAdminReducer,
  listSeancesReducer,
} from './reducers/userReducers';
import {
  coursListReducer,
  serviceDetailReducer,
  servicesListReducer,
  courseAddReducer,
} from './reducers/coursReducers.js';
import {
  abonnementAddReducer,
  couponAddReducer,
  couponsListReducer,
  coachsListRespoReducer,
  seanceAddReducer,
} from './reducers/responsableReducers.js';
// const _retrieveData = () => {
//   const fetchUser = async () => {
//     try {
//       const value = await getToken('userInfo');
//       if (value !== null) {
//         // We have data!!
//         return JSON.parse(value);
//       } else return null;
//     } catch (error) {
//       // Error retrieving data
//     }
//   };
//   fetchUser();
// };

const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  userProfile: userProfileReducer,
  clientsList: clientsListReducer,
  clientInfos: clientInfosReducer,
  employeInfos: employeInfosReducer,
  clientDelete: clientDeleteReducer,
  employeDelete: employeDeleteReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  coursList: coursListReducer,
  coachAdd: coachAddReducer,
  clientAdd: clientAddReducer,
  responsableAdd: responsableAddReducer,
  userImage: userImageReducer,
  userDeleteImage: userDeleteImageReducer,
  abonnementAdd: abonnementAddReducer,
  serviceDetail: serviceDetailReducer,
  servicesList: servicesListReducer,
  responsablesList: responsablesListReducer,
  coachsList: coachsListReducer,
  courseAdd: courseAddReducer,
  addCart: addCartReducer,
  userCart: cartReducer,
  couponAdd: couponAddReducer,
  couponsList: couponsListReducer,
  achatRegle: achatRegleReducer,
  clientRemoveItem: clientRemoveItemReducer,
  clientListFactures: clientListFacturesReducer,
  clientsListFacturesAdmin: clientsListFacturesAdminReducer,
  detailFactureAdmin: detailFactureAdminReducer,
  coachsListRespo: coachsListRespoReducer,
  seanceAdd: seanceAddReducer,
  listSeances: listSeancesReducer,
});
const initialState = {
  // userLogin: {
  //   userInfo: _retrieveData,
  // },
};
const getAsyncStorage = () => {
  return async (dispatch) => {
    try {
      await getToken('userInfo').then((result) => {
        if (result !== null) dispatch(setInit(result));
      });
    } catch (err) {
      console.log(err);
    }
  };
};
const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(getAsyncStorage());

export default store;
