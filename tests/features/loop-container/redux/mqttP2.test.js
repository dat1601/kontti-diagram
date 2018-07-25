import {
  LOOP_CONTAINER_MQTT_P_2,
} from '../../../../src/features/loop-container/redux/constants';

import {
  mqttP2,
  reducer,
} from '../../../../src/features/loop-container/redux/mqttP2';

describe('loop-container/redux/mqttP2', () => {
  it('returns correct action by mqttP2', () => {
    expect(mqttP2()).toHaveProperty('type', LOOP_CONTAINER_MQTT_P_2);
  });

  it('handles action type LOOP_CONTAINER_MQTT_P_2 correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_MQTT_P_2 }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
