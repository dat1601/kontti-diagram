import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  LOOP_CONTAINER_GET_TOE_BEGIN,
  LOOP_CONTAINER_GET_TOE_SUCCESS,
  LOOP_CONTAINER_GET_TOE_FAILURE,
  LOOP_CONTAINER_GET_TOE_DISMISS_ERROR,
} from '../../../../src/features/loop-container/redux/constants';

import {
  getToe,
  dismissGetToeError,
  reducer,
} from '../../../../src/features/loop-container/redux/getToe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loop-container/redux/getToe', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getToe succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getToe())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_TOE_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_TOE_SUCCESS);
      });
  });

  it('dispatches failure action when getToe fails', () => {
    const store = mockStore({});

    return store.dispatch(getToe({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_TOE_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_TOE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetToeError', () => {
    const expectedAction = {
      type: LOOP_CONTAINER_GET_TOE_DISMISS_ERROR,
    };
    expect(dismissGetToeError()).toEqual(expectedAction);
  });

  it('handles action type LOOP_CONTAINER_GET_TOE_BEGIN correctly', () => {
    const prevState = { getToePending: false };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_TOE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getToePending).toBe(true);
  });

  it('handles action type LOOP_CONTAINER_GET_TOE_SUCCESS correctly', () => {
    const prevState = { getToePending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_TOE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getToePending).toBe(false);
  });

  it('handles action type LOOP_CONTAINER_GET_TOE_FAILURE correctly', () => {
    const prevState = { getToePending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_TOE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getToePending).toBe(false);
    expect(state.getToeError).toEqual(expect.anything());
  });

  it('handles action type LOOP_CONTAINER_GET_TOE_DISMISS_ERROR correctly', () => {
    const prevState = { getToeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_TOE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getToeError).toBe(null);
  });
});

