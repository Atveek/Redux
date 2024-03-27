import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {
  points: 10,
};

export const increment = createAction("reward/increment");
const rewardReducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state, action) => {
    state.points++;
  });
});

export default rewardReducer;
