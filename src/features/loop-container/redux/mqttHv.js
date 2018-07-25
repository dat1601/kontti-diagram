// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  LOOP_CONTAINER_MQTT_HV,
} from './constants';

export function mqttHv(message) {
  return {
    type: LOOP_CONTAINER_MQTT_HV,
    message: message
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOOP_CONTAINER_MQTT_HV:
      return {
        ...state,
        mqttHV: action.message
      };

    default:
      return state;
  }
}
