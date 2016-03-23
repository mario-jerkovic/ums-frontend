
import { forEach } from 'lodash';
/**
 * check whether a specific distionaries is loaded
 * @param listOfDict {Array} - arry of dict
 * @param storeState {Object} - state
 * @returns {boolean}
 */
export function isDictLoaded (listOfDict, storeState) {
  let dictState = storeState['dictionaries'];
  listOfDict.forEach((dicName) => {
    let dicData = dictState[dicName];
    if (!dicData || !dicData.resources || dicData.isLoading || !dicData.resources.length) {
      return false;
    }
  });
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
  return map
}