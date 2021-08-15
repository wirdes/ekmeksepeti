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
            token: response.access_token,
            id: response.data.id,
            email: response.data.email,
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
            token: response.access_token,
            id: response.data.id,
            email: response.data.email,
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
    try {
      await auth().signOut();
    } catch (error) {
      return dispatch({type: types.LOGOUT_FAIL, payload: error});
    }
    return dispatch({type: types.LOGOUT_SUCCESS});
  };
};

export const authUser = () => {
  return async dispatch => {
    dispatch({type: types.AUTH_INIT});
    try {
      await auth().onAuthStateChanged(user => {
        if (user) {
          return dispatch({type: types.AUTH_SUCCESS, payload: user});
        }
      });
    } catch (error) {
      dispatch({type: types.AUTH_FAIL, payload: error});
    }
  };
};

export const createUser = (email, password) => {
  return async dispatch => {
    dispatch({type: types.USER_CREATE_INIT});
    let userData;
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      userData = user;
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'E-mail address is already in use.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: types.USER_CREATE_FAIL,
            payload: {
              type: 'auth/email-already-in-use',
              message: 'E-mail address is already in use.',
            },
          });
        case 'auth/invalid-email':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Invalid E-mail address',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: types.USER_CREATE_FAIL,
            payload: {
              type: 'auth/invalid-email',
              message: 'Invalid E-mail address.',
            },
          });
        case 'auth/invalid-password':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Wrong password.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: types.USER_CREATE_FAIL,
            payload: {
              type: 'auth/wrong-password',
              message: 'Wrong Password',
            },
          });

        default:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2:
              'Please check your e-mail address and password then try again.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: types.USER_CREATE_FAIL,
            payload: {
              type: 'auth/',
              message:
                'Please check your e-mail address and password then try again.',
            },
          });
      }
    }

    return dispatch({type: types.USER_CREATE_SUCCESS, payload: userData});
  };
};
