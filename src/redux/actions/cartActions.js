import * as types from '../types';

export const addToCart = p => {
  return async dispatch => {
    return dispatch({
      type: types.ADD_TO_CART,
      payload: {
        item: p,
      },
    });
  };
};

export const removeFromCart = p => {
  return async dispatch => {
    return dispatch({
      type: types.REMOVE_TO_CART,
      payload: {
        item: p,
      },
    });
  };
};
export const clearCart = () => {
  return async dispatch => {
    return dispatch({type: types.CLEAR_TO_CART});
  };
};

export const onDecrease = p => {
  return async dispatch => {
    return dispatch({
      type: types.DECREASE_ELEMENT,
      payload: {
        item: p,
      },
    });
  };
};

export const onIncrease = p => {
  return async dispatch => {
    return dispatch({
      type: types.INCREASE_ELEMENT,
      payload: {
        item: p,
      },
    });
  };
};
