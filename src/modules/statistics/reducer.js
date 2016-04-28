import * as types  from './constants';
import { TIMEPERIODID_CHANGED } from '../settings/duck';

const statisticsOneElementState = {
  isLoading: false,
  data: [],
  error: null
};

const statisticsInitialState = {
  [types.PRIORITIES]: statisticsOneElementState,
  [types.ALLOCATIONS_ADMINUNITS]: statisticsOneElementState,
  [types.ALLOCATIONS_DEPARTMENTS]: statisticsOneElementState,
  [types.PLACES]: statisticsOneElementState,
  [types.GENDER]: statisticsOneElementState,
};

export default function (state = statisticsInitialState, action = {}) {
  switch (action.type) {

    case types.STATISTICS_LOAD_START:
      return Object.assign({}, state, {
        [action.payload.collectionName]: {data: [], isLoading: true}
      });

    case types.STATISTICS_LOAD_SUCCESS:
      return Object.assign({}, state, {
        [action.payload.collectionName]: {
          isLoading: false,
          data: action.response
        }
      });

    case types.STATISTICS_LOAD_FAIL:
      return Object.assign({}, state, {
        [action.payload.collectionName]: {
          isLoading: false,
          data: [],
          error: action.error.message
        }
      });

    case TIMEPERIODID_CHANGED:
      return Object.assign({}, state,
        statisticsInitialState
      );

    default:
      return state;
  }
}