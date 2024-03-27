import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

//action name constants
// const init = "account/init";
const inc = "account/increment";
const dec = "account/decrement";
const incByAmt = "account/incrementByAmount";
const decByAmt = "account/decrementByAmount";
const geAccUserFulPending = "account/getUser/fulpending";
const geAccUserFulFilled = "account/getUser/fulfilled";
const geAccUserFulRejected = "account/getUser/fulrejected";
const incBonus = "bonus/increment";

// Store
const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk)
);

// Reducer
function accountReducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case geAccUserFulFilled:
      return { amount: action.payload };

    case geAccUserFulRejected:
      return { ...state, error: action.error, pending: false };

    case geAccUserFulPending:
      return { ...state, pending: true };

    case inc:
      return { amount: state.amount + 1 };

    case dec:
      return { amount: state.amount - 1 }; // Fixed decrement logic

    case incByAmt:
      return { amount: state.amount + action.payload };

    case decByAmt:
      return { amount: state.amount - action.payload };

    default:
      return state;
  }
}

function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    // case "init":
    //   return { points: action.payload };

    case incBonus:
      return { points: state.points + 1 };

    case incByAmt:
      if (action.payload >= 100) {
        return { points: state.points + 1 };
      }

    default:
      return state;
  }
}

// Actions
function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(geAccountUserFulPending());
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`); // Await getUser() directly
      dispatch(geAccountUserFulFilled(data.amount));
    } catch (error) {
      dispatch(geAccountUserFulRejected(error.message));
    }
  };
}
function geAccountUserFulFilled(value) {
  return { type: geAccUserFulFilled, payload: value };
}
function geAccountUserFulRejected(error) {
  return { type: geAccUserFulRejected, error: error };
}
function geAccountUserFulPending(value) {
  return { type: geAccUserFulPending };
}
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}
function decrementByAmount(value) {
  return { type: decByAmt, payload: value };
}
function incrementBonus(value) {
  return { type: incBonus };
}

store.dispatch(getUserAccount(1));

// store.dispatch(increment());
// setInterval(() => {
//   store.dispatch(incrementBonus());
// }, 5000);
