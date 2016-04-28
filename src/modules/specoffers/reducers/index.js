import {combineReducers} from 'redux'
import { ignoreActions } from 'redux-ignore'
import list from './list'
import view from './view'
import {LOCATION_CHANGE} from 'react-router-redux';

/**
 * export combined reducers (SPECOFFER REDUCER)
 */
export default combineReducers({
  list,
  view
});