import * as requestAjax from 'superagent';
import {REQUEST_API} from '../constants';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import {replaceTimePeriodId} from '../helpers';

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
  const {url, headers={}, method='get', params} = request;
  const {start, success, fail} = request.actions;
  const sendType = method === 'get' ? 'query' : 'send';

  let parsedUrl = replaceTimePeriodId(url, store.getState().settings.timePeriodId);

  dispatchAction(store.dispatch, start, {payload: payload});

  const currentRequest = requestAjax[method](backendHost + parsedUrl)
    .set('Authorization', token)
    .set('Accept', 'application/json');

  Object
    .keys(headers)
    .forEach(key=>currentRequest.set(key, headers[key]));

  currentRequest[sendType](params)
    .end((error, response) => {
      if (error) {
        dispatchAction(store.dispatch, fail, {error: error}, {payload: payload});
      } else {
        dispatchAction(store.dispatch, success, {response: response.body}, {payload: payload});
      }
    });
};


function dispatchAction(dispatch, action, ...rest) {
  if (isFunction(action)) {
    let result = action(...rest);

    if (isFunction(result)) {
      result(dispatch);
    } else {
      dispatch(result);
    }
  } else if (isObject(action)) {
    dispatch(Object.assign(action, ...rest));
  }
}