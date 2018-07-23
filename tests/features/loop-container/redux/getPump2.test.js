import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  LOOP_CONTAINER_GET_PUMP_2_BEGIN,
  LOOP_CONTAINER_GET_PUMP_2_SUCCESS,
  LOOP_CONTAINER_GET_PUMP_2_FAILURE,
  LOOP_CONTAINER_GET_PUMP_2_DISMISS_ERROR,
} from '../../../../src/features/loop-container/redux/constants';

import {
  getPump2,
  dismissGetPump2Error,
  reducer,
} from '../../../../src/features/loop-container/redux/getPump2';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loop-container/redux/getPump2', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPump2 succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPump2())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_2_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_2_SUCCESS);
      });
  });

  it('dispatches failure action when getPump2 fails', () => {
    const store = mockStore({});

    return store.dispatch(getPump2({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_2_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_2_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetPump2Error', () => {
    const expectedAction = {
      type: LOOP_CONTAINER_GET_PUMP_2_DISMISS_ERROR,
    };
    expect(dismissGetPump2Error()).toEqual(expectedAction);
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_2_BEGIN correctly', () => {
    const prevState = { getPump2Pending: false };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_2_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPump2Pending).toBe(true);
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_2_SUCCESS correctly', () => {
    const prevState = { getPump2Pending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_2_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPump2Pending).toBe(false);
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_2_FAILURE correctly', () => {
    const prevState = { getPump2Pending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_2_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPump2Pending).toBe(false);
    expect(state.getPump2Error).toEqual(expect.anything());
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_2_DISMISS_ERROR correctly', () => {
    const prevState = { getPump2Error: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_2_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPump2Error).toBe(null);
  });
});

