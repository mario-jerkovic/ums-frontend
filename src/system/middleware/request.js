import * as requestAjax from 'superagent';
import {REQUEST_API} from '../constants';
import isFunction from 'lodash/fp/isFunction';
import {dispatchAction} from './helpers';

/**
 {
    type: REQUEST_API,
    request: {
      url: 'url',
      headers: {},
      actions: {
        success: successAuth,//function or object, function can return another function (view redux-thunk)
        start: {type: types.AUTH_START},
        fail: {type: types.AUTH_FAIL}
      }
    },

    //can interrupt a processing
    interrupt:(store)=>false,

    //pass data to reducer
    payload: {
      token: token
    }
  };
 */
export default store => next => action => {
  const {request, type, payload={}, interrupt} = action;

  if (type !== REQUEST_API) {
    return next(action);
  }

  if (isFunction(interrupt) && interrupt(store)) {
    return next(action);
  }

  const {backendHost, token}= store.getState().config;
  const {url, headers={}, method='get'} = request;
  let {params} = request;
  const {start, success, fail} = request.actions;
  const sendType = method === 'get' ? 'query' : 'send';
  dispatchAction(store.dispatch, start, {payload: payload});

  const currentRequest = requestAjax[method](backendHost + url)
    .set('Authorization', token)
    .set('Accept', 'application/json');

  Object
    .keys(headers)
    .forEach(key=>currentRequest.set(key, headers[key]));

  if (isFunction(params)) {
    params = params(store)
  }

  currentRequest[sendType](params)
    .end((error, response) => {
      if (error) {
        dispatchAction(store.dispatch, fail, {error: error}, {payload: payload});
      } else {
        dispatchAction(store.dispatch, success, {response: response.body}, {payload: payload});
      }
    });
};