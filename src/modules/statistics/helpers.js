import find from 'lodash/find';

/**
 * func for putting data to MAP
 * @param mapData
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
    return map.dataProvider.areas; // for testing purposes;
  };
}

/**
 * Turns:
 {
    "name": "журналістика",
    "menCount": 33,
    "womenCount": 0
  }
 
 Into
 [
  {
    specoffer: 'журналістика',
    key: 'menCount',
    value: 33
  },
  {
    specoffer: 'журналістика',
    key: 'womenCount',
    value: 22
  }
 ]
 * @param data
 * @returns {*[]}
 */
export function normalizeGenderStat(data) {
  let { name: specoffer } =  data;
  return [
    {
      specoffer,
      key: 'чол.',
      value: data.menCount
    },
    {
      specoffer,
      key: 'жін.',
      value: data.womenCount
    }
  ];
}
