import {
  LOOP_CONTAINER_MQTT,
} from '../../../../src/features/loop-container/redux/constants';

import {
  mqtt,
  reducer,
} from '../../../../src/features/loop-container/redux/mqtt';

describe('loop-container/redux/mqtt', () => {
  it('returns correct action by mqtt', () => {
    expect(mqtt()).toHaveProperty('type', LOOP_CONTAINER_MQTT);
  });

  it('handles action type LOOP_CONTAINER_MQTT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_MQTT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
