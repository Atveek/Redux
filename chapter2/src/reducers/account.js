import {
  geAccUserFulFilled,
  geAccUserFulRejected,
  geAccUserFulPending,
  inc,
  dec,
  incByAmt,
  decByAmt,
} from "../actions";

export function accountReducer(state = { amount: 1 }, action) {
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
