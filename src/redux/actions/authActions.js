import {Platform} from 'react-native';
import * as types from '../types';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ServerIP = 'https://backendfood.herokuapp.com'; // https://backendfood.herokuapp.com // http://localhost:5000

export const register = ({email, password, name, surname}) => {
  return async dispatch => {
    dispatch({type: types.USER_CREATE_INIT});
    axios
      .post(`${ServerIP}/api/admin/register`, {
        name,
        surname,
        email,
        password,
      })
      .then(response => {
        return dispatch({
          type: types.USER_CREATE_SUCCESS,
          payload: {
            id: response.data.data.id,
            email: response.data.data.email,
            name: response.data.data.name,
            surname: response.data.data.surname,
            address: response.data.data.address,
          },
        });
      })
      .catch(error => {
        let errorMessages = 'asd';
        if (error.response !== undefined) {
          errorMessages = error.response.data.message;
        } else {
          errorMessages = 'Bilinmeyen hata';
        }

        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: errorMessages,
          visibilityTime: 3000,
          autoHide: true,
          // eslint-disable-next-line eqeqeq
          topOffset: Platform.OS == 'ios' ? 40 : 30,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
        return dispatch({
          type: types.USER_CREATE_FAIL,
          payload: {
            message: errorMessages,
          },
        });
      });
  };
};

export const login = ({email, password}) => {
  return async dispatch => {
    dispatch({type: types.LOGIN_ATTEMPT});
    axios
      .post(`${ServerIP}/api/admin/login`, {
        email,
        password,
      })
      .then(response => {
        return dispatch({
          type: types.LOGIN_SUCCESS,
          payload: {
            id: response.data.data.id,
            email: response.data.data.email,
            name: response.data.data.name,
            surname: response.data.data.surname,
            address: response.data.data.address,
          },
        });
      })
      .catch(error => {
        console.log(error);
        let errorMessages = 'asd';
        if (error.response !== undefined) {
          errorMessages = error.response.data.message;
        } else {
          errorMessages = 'Bilinmeyen hata';
        }

        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: errorMessages,
          visibilityTime: 3000,
          autoHide: true,
          // eslint-disable-next-line eqeqeq
          topOffset: Platform.OS == 'ios' ? 40 : 30,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
        return dispatch({
          type: types.LOGIN_FAILED,
          payload: {
            message: errorMessages,
          },
        });
      });
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch({type: types.LOGOUT_INIT});
    return dispatch({type: types.LOGOUT_SUCCESS});
  };
};
