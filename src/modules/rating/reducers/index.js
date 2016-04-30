import {combineReducers} from 'redux'
import { ignoreActions } from 'redux-ignore'
import specofferChooser from './specofferChooser'
import ratingList from './ratingList'
import sidebar from './sidebar'
import {LOCATION_CHANGE} from 'react-router-redux';

/**
 * export combined reducers (RATING REDUCER)
 */
export default combineReducers({
  specofferChooser: ignoreActions(specofferChooser,
    (action) => action.type === LOCATION_CHANGE && action.payload.pathname !== '/rating'),
  ratingList,
  sidebar,
});