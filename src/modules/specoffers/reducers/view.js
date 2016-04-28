import * as types from '../constants';
import {ENROLMENTS_FIELD_NAMES} from '../../enrolments/constants';
import {combineReducers} from 'redux';

export let getSpecofferEnrolmentsBySpecofferId = (state, specofferId) => {
  return state.specoffers.view.specofferEnrolments.data[specofferId]
}

export let getSpecofferEnrolments = (state) => state.specoffers.view.specofferEnrolments

const enrolmentsDefaultState = {
  isLoading: false,
  data: {},
  enrolmentsFieldNames: ENROLMENTS_FIELD_NAMES,
  limit: 300,
  error: null
};

export default function specofferEnrolments(state = enrolmentsDefaultState, action = {}) {
  switch (action.type) {

    case types.LOAD_ENROLMENTS_BY_SPECOFFERS_START:
      return Object.assign({}, state, {isLoading: true, error: null});

    case types.LOAD_ENROLMENTS_BY_SPECOFFERS_SUCCESS:
      return Object.assign({}, state,
        {
          isLoading: false,
          data: Object.assign({}, state.data,
            { [action.payload.specofferId]:  action.response }),
          error: null
        }
      );

    case types.LOAD_ENROLMENTS_BY_SPECOFFERS_FAIL:
      return Object.assign({}, state, {isLoading: false}, {error: action.error.message});

    case types.ENROLMENTS_LIST_WIDTH_CHANGED:
      let changedName = {
        'name': state.enrolmentsFieldNames[action.payload.columnKey].name,
        'width': action.payload.newColumnWidth
      };
      return Object.assign({}, state,
        {
          enrolmentsFieldNames: {...state.enrolmentsFieldNames, [action.payload.columnKey]: changedName}
        }
      );

    default:
      return state;
  }
}

export let getSpecofferInfoMain = (state, specofferId) => state.specoffers.view.mainInfo.data[specofferId]

const mainInfoDefaultState = {
  isLoading: false,
  data: {},
  error: null
};

export function mainInfo(state = mainInfoDefaultState, action = {}) {
  switch (action.type) {

    case types.LOAD_ONE_SPECOFFER_START:
      return Object.assign({}, state, {isLoading: true, error: null});

    case types.LOAD_ONE_SPECOFFER_SUCCESS:
      return Object.assign({}, state,
        {
          isLoading: false,
          data: Object.assign({}, state.data,
            { [action.payload.specofferId]:  action.response }),
          error: null
        }
      );

    case types.LOAD_ONE_SPECOFFER_FAIL:
      return Object.assign({}, state, {isLoading: false}, {error: action.error.message});

    default:
      return state;
  }
}

export default combineReducers({
  specofferEnrolments,
  mainInfo
});
