import forEach from 'lodash/forEach';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import * as consts from './constants';

/**
 * check whether a specific distionaries is loaded
 * @param listOfDict {Array} || {String} - array of dict
 * @param dictState {Object} - state
 * @returns {boolean}
 */
export function isDictLoaded(listOfDict, dictState) {
  if (!listOfDict || !Array.isArray(listOfDict) && !isString(listOfDict)) {
    throw new Error('isDictLoaded:', consts.errors.wrongListOfDic);
  }

  if (!dictState || !isObject(dictState)) {
    throw new Error('dic state {object} is needed by isDictLoaded fn as a second parameter');
  }
  
  if (isString(listOfDict)) {
    listOfDict = [listOfDict]
  }

  if (!Object.keys(dictState).length) return false;
  
  for (let i = 0; i < listOfDict.length; i++) {
    let dicData = dictState[listOfDict[i]];
    
    if (!dicData) throw ReferenceError(`Dic "${dicData}" doesn't exist at all!
      Please, check if it's name is correct or add a it to dict store default state!
      (for this check a "disctionariesDefaultState" variable in dictionaries/reducer.js)`);

    if (!dicData || dicData.isLoading || !dicData.resources || !dicData.resources.length) {
      return false;
    }
  }

  return true;
}

/**
 *
 * @param data
 * @returns {Array}
 */
export function createDataMap(data) {
  let map = [];
  forEach(data, (item) => map[item.id] = item.name);
  return map;
}