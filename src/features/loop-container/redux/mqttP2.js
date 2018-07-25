// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  LOOP_CONTAINER_MQTT_P_2,
} from './constants';

export function mqttP2(message) {
  return {
    type: LOOP_CONTAINER_MQTT_P_2,
    message: message
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOOP_CONTAINER_MQTT_P_2:
      return {
        ...state,
        mqttP2: action.message
      };

    default:
      return state;
  }
}
