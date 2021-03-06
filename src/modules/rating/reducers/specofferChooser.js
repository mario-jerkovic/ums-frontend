import * as types from '../constants';
import {LOCATION_CHANGE} from 'react-router-redux';

import { TIMEPERIODID_CHANGED } from '../../settings/duck';

/**
 * lost of departments and specoffers to choose
 */
const specofferChooserInitialState = {
  isLoading: true,
  resources: [],
  departmentId: 498,
  specofferId: null,
  error: null
};


export default function specofferChooser(state = specofferChooserInitialState, action = {}) {
  switch (action.type) {
    case types.LOAD_SPECOFFER_CHOOSER_START:
      return Object.assign({}, state, {isLoading: true, resources: []});

    case types.LOAD_SPECOFFER_CHOOSER_SUCCESS:
      return Object.assign({}, state,
        {
          isLoading: false,
          resources: [...action.response]
        }
      );

    case types.LOAD_SPECOFFER_CHOOSER_FAIL:
      return Object.assign({}, state, {isLoading: false, error: action.error.message});

    case TIMEPERIODID_CHANGED:
      return Object.assign({}, state,
        {
          isLoading: false,
          resources: []
        }
      );

    case LOCATION_CHANGE: // listen to query parameters changes
      let {
        departmentId = state.departmentId,
        specofferId = state.specofferId } = action.payload.query;
      return Object.assign({}, state, {departmentId, specofferId});

    default:
      return state;
  }
}
