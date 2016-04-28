import * as types from '../constants';
import {SPECOFFERS_FIELD_NAMES} from '../constants';

import lcache from '../../../system/lcache';
import { TIMEPERIODID_CHANGED } from '../../settings/duck';

const defaultState = {
  isLoading: false,
  resources: [],
  specoffersFieldNames: SPECOFFERS_FIELD_NAMES,
  filterByName: '',
  limit: 300,
  error: null
};

export default function list(state = defaultState, action = {}) {
  switch (action.type) {

    case types.LOAD_ALL_SPECOFFERS_START:
      return Object.assign({}, state, {isLoading: true, resources: [], error: null});

    case types.LOAD_ALL_SPECOFFERS_SUCCESS:
      return Object.assign({}, state,
        {
          isLoading: false,
          error: null
        },
        action.response
      );

    case types.LOAD_ALL_SPECOFFERS_FAIL:
      return Object.assign({}, state, {isLoading: false}, {error: action.error.message});

    case TIMEPERIODID_CHANGED:
      return Object.assign({}, state,
        {
          isLoading: false,
          resources: []
        }
      );

    case types.SPECOFFERS_LIST_WIDTH_CHANGED:
      let changedName = {
        'name': state.specoffersFieldNames[action.payload.columnKey].name,
        'width': action.payload.newColumnWidth
      };
      return Object.assign({}, state,
        {
          specoffersFieldNames: {...state.specoffersFieldNames, [action.payload.columnKey]: changedName}
        }
      );

    case types.FILTER_BY_NAME:
      return Object.assign({}, state,
        {
          filterByName: action.payload.filterByName
        }
      );

    default:
      return state;
  }
}
