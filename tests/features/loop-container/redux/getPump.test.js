import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  LOOP_CONTAINER_GET_PUMP_BEGIN,
  LOOP_CONTAINER_GET_PUMP_SUCCESS,
  LOOP_CONTAINER_GET_PUMP_FAILURE,
  LOOP_CONTAINER_GET_PUMP_DISMISS_ERROR,
} from '../../../../src/features/loop-container/redux/constants';

import {
  getPump,
  dismissGetPumpError,
  reducer,
} from '../../../../src/features/loop-container/redux/getPump';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loop-container/redux/getPump', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPump succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPump())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_SUCCESS);
      });
  });

  it('dispatches failure action when getPump fails', () => {
    const store = mockStore({});

    return store.dispatch(getPump({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_PUMP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetPumpError', () => {
    const expectedAction = {
      type: LOOP_CONTAINER_GET_PUMP_DISMISS_ERROR,
    };
    expect(dismissGetPumpError()).toEqual(expectedAction);
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_BEGIN correctly', () => {
    const prevState = { getPumpPending: false };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPumpPending).toBe(true);
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_SUCCESS correctly', () => {
    const prevState = { getPumpPending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPumpPending).toBe(false);
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_FAILURE correctly', () => {
    const prevState = { getPumpPending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPumpPending).toBe(false);
    expect(state.getPumpError).toEqual(expect.anything());
  });

  it('handles action type LOOP_CONTAINER_GET_PUMP_DISMISS_ERROR correctly', () => {
    const prevState = { getPumpError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_PUMP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPumpError).toBe(null);
  });
});

