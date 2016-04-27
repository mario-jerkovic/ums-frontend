import {REQUEST_API} from '../../system/constants';
import * as types from './constants';

export function loadSpecoffersChooser() {
  return {
    type: REQUEST_API,
    request: {
      url: `/departments/timeperiods/{{timePeriodId}}/specoffers`,
      actions: {
        start: {type: types.LOAD_SPECOFFER_CHOOSER_START},
        success: {type: types.LOAD_SPECOFFER_CHOOSER_SUCCESS},
        fail: {type: types.LOAD_SPECOFFER_CHOOSER_FAIL}
      }
    },
    interrupt: (store) => !!store.getState().rating.specofferChooser.resources.length,
    meta: {
      reducerName: types.RATING
    }
  };
}


export function loadRatingList(specofferId) {
  return {
    type: REQUEST_API,
    request: {
      url: `/enrolments/${specofferId}/ratings`,
      actions: {
        start: {type: types.LOAD_RATING_LIST_START},
        success: {type: types.LOAD_RATING_LIST_SUCCESS},
        fail: {type: types.LOAD_RATING_LIST_FAIL}
      }
    }
  };
}

export function highlighEnrolment(enrolmentId) {
  return {
    type: types.HIGHLIGH_ENROLMENT,
    payload: {
      enrolmentId
    }
  };
}

export const toggleHelperSidebar = (isOpen = true) => () => ({
  type: types.OPEN_HELP_SIDEBAR,
  payload: {
    isOpen
  }
});

export const toggleGenderStatSidebar = (isOpen = true) => () => ({
  type: types.OPEN_GENDER_STAT_SIDEBAR,
  payload: {
    isOpen
  }
});