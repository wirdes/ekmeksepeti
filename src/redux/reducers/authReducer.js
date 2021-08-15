import * as types from '../types';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  userData: {
    userId: null,
    createdAt: null,
    email: null,
  },
  error: undefined,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.USER_CREATE_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case types.USER_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case types.USER_CREATE_SUCCESS:
      return {
        userData: {
          userId: action.payload.uid,
          createdAt: action.payload.metadata.creationTime,
          email: action.payload.email,
        },
        isLoading: false,
        error: null,
        isLoggedIn: true,
      };
    case types.AUTH_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case types.AUTH_SUCCESS:
      return {
        userData: {
          userId: action.payload.uid,
          createdAt: action.payload.metadata.creationTime,
          email: action.payload.email,
        },
        isLoading: false,
        error: null,
        isLoggedIn: true,
      };
    case types.LOGIN_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userData: {
          userId: action.payload.userData.uid,
          createdAt: action.payload.userData.metadata.creationTime,
          email: action.payload.userData.email,
        },
        error: undefined,
      };

    case types.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };

    case types.LOGOUT_INIT:
      return {
        ...state,
        isLoading: true,
      };

    case types.LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        userData: {
          userId: null,
          createdAt: null,
          email: null,
        },
        error: null,
      };

    default:
      return state;
  }
}
