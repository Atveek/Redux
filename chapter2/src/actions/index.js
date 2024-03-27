//action name constants
// const init = "account/init";
import axios from "axios";

export const inc = "account/increment";
export const dec = "account/decrement";
export const incByAmt = "account/incrementByAmount";
export const decByAmt = "account/decrementByAmount";
export const geAccUserFulPending = "account/getUser/fulpending";
export const geAccUserFulFilled = "account/getUser/fulfilled";
export const geAccUserFulRejected = "account/getUser/fulrejected";
export const incBonus = "bonus/increment";

export function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(geAccountUserFulPending());
      const { data } = await axios.get(`http://localhost:8080/accounts/${id}`); // Await getUser() directly
      dispatch(geAccountUserFulFilled(data.amount));
    } catch (error) {
      dispatch(geAccountUserFulRejected(error.message));
    }
  };
}
export function geAccountUserFulFilled(value) {
  return { type: geAccUserFulFilled, payload: value };
}
export function geAccountUserFulRejected(error) {
  return { type: geAccUserFulRejected, error: error };
}
export function geAccountUserFulPending(value) {
  return { type: geAccUserFulPending };
}
export function increment() {
  return { type: inc };
}
export function decrement() {
  return { type: dec };
}
export function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}
export function decrementByAmount(value) {
  return { type: decByAmt, payload: value };
}
export function incrementBonus() {
  return { type: incBonus };
}
