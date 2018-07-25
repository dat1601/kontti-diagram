import {
  LOOP_CONTAINER_MQTT_TE,
} from '../../../../src/features/loop-container/redux/constants';

import {
  mqttTe,
  reducer,
} from '../../../../src/features/loop-container/redux/mqttTe';

describe('loop-container/redux/mqttTe', () => {
  it('returns correct action by mqttTe', () => {
    expect(mqttTe()).toHaveProperty('type', LOOP_CONTAINER_MQTT_TE);
  });

  it('handles action type LOOP_CONTAINER_MQTT_TE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_MQTT_TE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
