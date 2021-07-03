import axios from 'axios';
const baseUrl = 'http://192.168.43.36:8080';
import {
  COURS_LIST_REQUEST,
  COURS_LIST_FAIL,
  COURS_LIST_SUCCESS,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
} from '../constants/coursConstants';
import {
  SERVICES_LIST_REQUEST,
  SERVICES_LIST_SUCCESS,
  SERVICES_LIST_FAIL,
  SERVICES_DETAIL_REQUEST,
  SERVICES_DETAIL_SUCCESS,
  SERVICES_DETAIL_FAIL,
} from '../constants/userConstants';

export const getListCours = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURS_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    const { data } = await axios.get(`${baseUrl}/api/cours`, config);
    dispatch({ type: COURS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getServices = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICES_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    const { data } = await axios.get(`${baseUrl}/api/abonnements`, config);
    dispatch({ type: SERVICES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getServicesDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICES_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    const { data } = await axios.get(`${baseUrl}/api/services/${id}`, config);
    dispatch({ type: SERVICES_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICES_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
