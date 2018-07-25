// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  LOOP_CONTAINER_MQTT_P_1,
} from './constants';

export function mqttP1(message) {
  return {
    type: LOOP_CONTAINER_MQTT_P_1,
    message: message
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOOP_CONTAINER_MQTT_P_1:
      return {
        ...state,
        mqttP1: action.message
      };

    default:
      return state;
  }
}
