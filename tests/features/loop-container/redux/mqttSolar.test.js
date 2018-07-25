import {
  LOOP_CONTAINER_MQTT_SOLAR,
} from '../../../../src/features/loop-container/redux/constants';

import {
  mqttSolar,
  reducer,
} from '../../../../src/features/loop-container/redux/mqttSolar';

describe('loop-container/redux/mqttSolar', () => {
  it('returns correct action by mqttSolar', () => {
    expect(mqttSolar()).toHaveProperty('type', LOOP_CONTAINER_MQTT_SOLAR);
  });

  it('handles action type LOOP_CONTAINER_MQTT_SOLAR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_MQTT_SOLAR }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
