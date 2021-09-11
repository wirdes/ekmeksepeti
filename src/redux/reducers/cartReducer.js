import * as types from '../types';

const INITIAL_STATE = {
  items: [],
  itemsCounter: [],
};

function cart(state = INITIAL_STATE, action) {
  let a = state.items;
  let aCounter = state.itemsCounter;
  switch (action.type) {
    case types.ADD_TO_CART:
      if (a.findIndex(e => e._id === action.payload.item._id) === -1) {
        a = [...a, action.payload.item];
        let {_id} = action.payload.item;
        let obj = {_id, quantity: 1};
        aCounter = [...aCounter, obj];
      } else {
        aCounter[
          aCounter.findIndex(e => e._id === action.payload.item._id)
        ].quantity += 1;
      }
      return {
        ...state,
        items: a,
        itemsCounter: aCounter,
      };
    case types.DECREASE_ELEMENT:
      aCounter[
        aCounter.findIndex(e => e._id === action.payload.item._id)
      ].quantity -= 1;

      return {
        ...state,
        items: a,
        itemsCounter: aCounter,
      };
    case types.INCREASE_ELEMENT:
      aCounter[
        aCounter.findIndex(e => e._id === action.payload.item._id)
      ].quantity += 1;

      return {
        ...state,
        items: a,
        itemsCounter: aCounter,
      };
    case types.REMOVE_TO_CART:
      a.splice(
        a.findIndex(e => e._id === action.payload.item._id),
        1,
      );
      aCounter.splice(
        aCounter.findIndex(e => e._id === action.payload.item._id),
        1,
      );

      return {
        ...state,
        items: a,
        itemsCounter: aCounter,
      };
    case types.CLEAR_TO_CART:
      return {
        ...state,
        items: [],
        itemsCounter: [],
      };

    default:
      return state;
  }
}

export {cart};
