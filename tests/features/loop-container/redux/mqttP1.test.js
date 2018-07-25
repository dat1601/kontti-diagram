import {
  LOOP_CONTAINER_MQTT_P_1,
} from '../../../../src/features/loop-container/redux/constants';

import {
  mqttP1,
  reducer,
} from '../../../../src/features/loop-container/redux/mqttP1';

describe('loop-container/redux/mqttP1', () => {
  it('returns correct action by mqttP1', () => {
    expect(mqttP1()).toHaveProperty('type', LOOP_CONTAINER_MQTT_P_1);
  });

  it('handles action type LOOP_CONTAINER_MQTT_P_1 correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_MQTT_P_1 }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
