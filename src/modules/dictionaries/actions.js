import * as consts from './constants';
import {REQUEST_API} from '../../system/constants';
import isString from 'lodash/isString';

export default function loadDictionaries(listOfDict) {
  if (!listOfDict) throw new Error('loadDictionaries:', consts.errors.wrongListOfDic);
  
  if (isString(listOfDict)) listOfDict = [listOfDict];

  return dispatch => {
    listOfDict.forEach((dicName) => {
      let {url, params} = consts.DICTIONARY_MAP[dicName];
      //todo check state + cache

      dispatch({
        type: REQUEST_API,
        request: {
          url: url,
          actions: {
            start: {type: consts.DICTIONARY_LOAD_START},
            success: {type: consts.DICTIONARY_LOAD_SUCCESS},
            fail: {type: consts.DICTIONARY_LOAD_FAIL}
          },
          params
        },
        interrupt: (store) => !!store.getState().dictionaries[dicName].resources.length,

        payload: {
          collectionName: dicName
        }
      });
    });
  };
}
