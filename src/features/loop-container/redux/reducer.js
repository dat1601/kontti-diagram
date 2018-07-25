// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as getPointsSchemaReducer } from './getPointsSchema';
import { reducer as mqttTeReducer } from './mqttTe';
import { reducer as mqttHvReducer } from './mqttHv';
import { reducer as mqttP1Reducer } from './mqttP1';
import { reducer as mqttP2Reducer } from './mqttP2';
import { reducer as mqttSolarReducer } from './mqttSolar';

const reducers = [
  getPointsSchemaReducer,
  mqttTeReducer,
  mqttHvReducer,
  mqttP1Reducer,
  mqttP2Reducer,
  mqttSolarReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
