import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  LOOP_CONTAINER_GET_POINTS_SCHEMA_BEGIN,
  LOOP_CONTAINER_GET_POINTS_SCHEMA_SUCCESS,
  LOOP_CONTAINER_GET_POINTS_SCHEMA_FAILURE,
  LOOP_CONTAINER_GET_POINTS_SCHEMA_DISMISS_ERROR,
} from '../../../../src/features/loop-container/redux/constants';

import {
  getPointsSchema,
  dismissGetPointsSchemaError,
  reducer,
} from '../../../../src/features/loop-container/redux/getPointsSchema';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loop-container/redux/getPointsSchema', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPointsSchema succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPointsSchema())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_POINTS_SCHEMA_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_POINTS_SCHEMA_SUCCESS);
      });
  });

  it('dispatches failure action when getPointsSchema fails', () => {
    const store = mockStore({});

    return store.dispatch(getPointsSchema({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOOP_CONTAINER_GET_POINTS_SCHEMA_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOOP_CONTAINER_GET_POINTS_SCHEMA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetPointsSchemaError', () => {
    const expectedAction = {
      type: LOOP_CONTAINER_GET_POINTS_SCHEMA_DISMISS_ERROR,
    };
    expect(dismissGetPointsSchemaError()).toEqual(expectedAction);
  });

  it('handles action type LOOP_CONTAINER_GET_POINTS_SCHEMA_BEGIN correctly', () => {
    const prevState = { getPointsSchemaPending: false };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_POINTS_SCHEMA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPointsSchemaPending).toBe(true);
  });

  it('handles action type LOOP_CONTAINER_GET_POINTS_SCHEMA_SUCCESS correctly', () => {
    const prevState = { getPointsSchemaPending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_POINTS_SCHEMA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPointsSchemaPending).toBe(false);
  });

  it('handles action type LOOP_CONTAINER_GET_POINTS_SCHEMA_FAILURE correctly', () => {
    const prevState = { getPointsSchemaPending: true };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_POINTS_SCHEMA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPointsSchemaPending).toBe(false);
    expect(state.getPointsSchemaError).toEqual(expect.anything());
  });

  it('handles action type LOOP_CONTAINER_GET_POINTS_SCHEMA_DISMISS_ERROR correctly', () => {
    const prevState = { getPointsSchemaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOOP_CONTAINER_GET_POINTS_SCHEMA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPointsSchemaError).toBe(null);
  });
});

