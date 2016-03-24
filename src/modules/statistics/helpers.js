import forEach from 'lodash/forEach';
import find from 'lodash/find';

/**
 *
 * @param data
 * @returns {Array}
 */
export function fillMapWithData(mapData) {
  return (event) => {
    let map = event.chart;
    map.dataProvider.areas = map.dataProvider.areas.map((area) => {
      let adminUnit = find(mapData, (adminUnit) => parseInt(area.id) === adminUnit.adminUnitId);
      if (adminUnit) {
        area.value = adminUnit.entrantCount;
      } else {
        area.value = 0;
      }
      return area;
    });
    map.validateNow();
    console.log('map.dataProvider.areas', map.dataProvider.areas);
    return map.dataProvider.areas; // for testing purpuses;
  }
}