import {Platform} from 'react-native';
import * as types from '../types';
import axios from 'axios';

export const register = ({email, password}) => {
  return async dispatch => {
    axios
      .post('http://localhost:5000/api/admin/login', {
        email: email,
        password: password,
      })
      .then(response => {
        setLoading(false);
        setUserSession(response.data.access_token, response.data.data);
        props.history.push('/dashboard');
      })
      .catch(error => {
        setLoading(false);
        errorMessage('Email yada şifreniz yanlış');
      });
  };
};

export const login = ({email, password}) => {
  return async dispatch => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('giris');
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            return dispatch({
              type: types.LOGIN_FAILED,
              payload: {
                type: 'auth/invalid-email',
                message: 'Geçersiz e-mail.',
              },
            });
          case 'auth/user-not-found':
            return dispatch({
              type: types.LOGIN_FAILED,
              payload: {
                type: 'auth/invalid-email',
                message: 'Geçersiz e-mail.',
              },
            });
          case 'auth/wrong-password':
            return dispatch({
              type: types.LOGIN_FAILED,
              payload: {
                type: 'auth/wrong-password',
                message: 'Geçersiz şifre, lütfen kontrol ediniz.',
              },
            });
          case 'auth/too-many-requests':
            return dispatch({
              type: types.LOGIN_FAILED,
              payload: {
                type: 'auth/wrong-password',
                message:
                  'Çok fazla hatalı giriş yaptınız, Lütfen daha sonra tekrar deneyiniz.',
              },
            });
          default:
            return dispatch({
              type: types.LOGIN_FAILED,
              payload: {
                type: 'auth/',
                message:
                  'Lütfen email adresinizi kontrol ediniz ve daha sonra tekrar deneyiniz.',
              },
            });
        }
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
