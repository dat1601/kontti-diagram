import {
  LOOP_CONTAINER_MQTT_HV,
} from '../../../../src/features/loop-container/redux/constants';

import {
  mqttHv,
  reducer,
} from '../../../../src/features/loop-container/redux/mqttHv';

describe('loop-container/redux/mqttHv', () => {
  it('returns correct action by mqttHv', () => {
    expect(mqttHv()).toHaveProperty('type', LOOP_CONTAINER_MQTT_HV);
  });

  it('handles action type LOOP_CONTAINER_MQTT_HV correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_MQTT_HV }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
