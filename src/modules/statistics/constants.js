import {normalizeGenderStat} from './helpers'

// ACTION TYPES
export const STATISTICS_LOAD_START = 'STATISTICS_LOAD_START';
export const STATISTICS_LOAD_SUCCESS = 'STATISTICS_LOAD_SUCCESS';
export const STATISTICS_LOAD_FAIL = 'STATISTICS_LOAD_FAIL';

// statistics entities names
export const PRIORITIES = 'PRIORITIES';
export const ALLOCATIONS_ADMINUNITS = 'ALLOCATIONS_ADMINUNITS';
export const ALLOCATIONS_ADMINUNITS_MAP = 'ALLOCATIONS_ADMINUNITS_MAP';
export const ALLOCATIONS_DEPARTMENTS = 'ALLOCATIONS_DEPARTMENTS';
export const PLACES = 'PLACES';
export const GENDER = 'GENDER';

/**
 * callApi - info for fetching data from a server
 * cacheTime - 5h x 60sec = 300
 * route - internal route for navigation
 * chartTitle - pill title
 * amChartConfig - config for amchart
 * @type {{}}
 */
export const STATISTICS_MAP = {
  [PRIORITIES]: {
    callApi: {
      url: '/stats/{{timePeriodId}}/priorities',
      params: {},
      cache: true,
      cacheTime: 300
    },
    route: `/statistics/chart/${PRIORITIES}`,
    title: 'Статистика по пріоритетам',
    headers: [
      {key: 'priority', title: 'Пріоритет'},
      {key: 'count', title: 'Кількість заяв'}
    ],
    amChartConfig: {
      'type': 'serial',
      'theme': 'light',
      'marginRight': 70,
      'dataProvider': null,
      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left',
        'title': 'Кількість'
      }],
      'startDuration': 1,
      'graphs': [{
        'balloonText': '<b>[[value]] заяв [[category]]-го пріоритету</b>',
        'fillAlphas': 0.9,
        'lineAlpha': 0.2,
        'title': 'count',
        'type': 'column',
        'valueField': 'count'
      }],
      'chartCursor': {
        'categoryBalloonEnabled': false,
        'cursorAlpha': 0,
        'zoomable': false
      },
      'categoryField': 'priority',
      'categoryAxis': {
        'gridPosition': 'start',
        'labelRotation': 45,
        'title': 'Пріоритет'
      },
      'export': {
        'enabled': true
      }

    }
  },
  [ALLOCATIONS_ADMINUNITS]: {
    callApi: {
      url: '/stats/{{timePeriodId}}/entrants/allocations/adminunits',
      params: {},
      cache: true,
      cacheTime: 300
    },
    route: `/statistics/chart/${ALLOCATIONS_ADMINUNITS}`,
    title: 'Статистика по областям',
    headers: [
      {key: 'adminUnit', title: 'Область'},
      {key: 'entrantCount', title: 'Кількість заяв'}
    ],
    amChartConfig: {
      'type': 'pie',
      'theme': 'light',
      'dataProvider': null,
      'titleField': 'adminUnit',
      'valueField': 'entrantCount',
      'labelRadius': 5,
      'radius': '42%',
      'innerRadius': '60%',
      'labelText': '[[title]]',
      'export': {
        'enabled': true
      }
    }
  },
  [ALLOCATIONS_ADMINUNITS_MAP]: {
    callApi: {
      url: '/stats/{{timePeriodId}}/entrants/allocations/adminunits',
      collectionName: ALLOCATIONS_ADMINUNITS,
      params: {},
      cache: true,
      cacheTime: 300
    },
    headers: [
      {key: 'adminUnit', title: 'Область'},
      {key: 'entrantCount', title: 'Кількість заяв'}
    ],
    route: `/statistics/chart/${ALLOCATIONS_ADMINUNITS_MAP}`,
    title: 'Статистика по областям (карта)',
    amChartConfig: {
      'type': 'map',
      'theme': 'light',
      'colorSteps': 10,
      'dataProvider': {
        'map': 'ukraineLow',
        'getAreasFromMap': true,
        'zoomLevel': 0.9,
        'areas': []
      },
      'areasSettings': {
        'autoZoom': true,
        'balloonText': '[[title]]: <strong>[[value]]</strong>'
      },
      'valueLegend': {
        'right': 10,
        'minValue': 'Трохи заявок',
        'maxValue': 'Багато!'
      },
      'zoomControl': {
        'minZoomLevel': 0.9
      },
      'titles': 'titles',
      'listeners':[{'event':'init', 'method': function updateHeatmap(event) {

      } }]
    }
  },
  [ALLOCATIONS_DEPARTMENTS]: {
    callApi: {
      url: '/stats/{{timePeriodId}}/entrants/allocations/departments',
      params: {},
      cache: true,
      cacheTime: 300
    },
    route: `/statistics/chart/${ALLOCATIONS_DEPARTMENTS}`,
    title: 'Статистика по факультетам',
    headers: [
      {key: 'name', title: 'Департамент/фаультет'},
      {key: 'awardsCount', title: 'Нагороди'},
      {key: 'benefitCount', title: 'Пільги'},
      {key: 'generalCount', title: 'Загальна кількість'}
    ],
    amChartConfig: {
      'type': 'serial',
      'theme': 'light',
      'categoryField': 'name',
      'rotate': true,
      'startDuration': 1,
      'categoryAxis': {
        'gridPosition': 'start',
        'position': 'left'
      },
      'trendLines': [],
      'legend': {
        'useGraphSettings': true
      },
      'graphs': [
        {
          'balloonText': 'Загальна кількість:[[value]]',
          'alphaField': 'Загальна кількіст',
          'fillAlphas': 0.8,
          'id': 'AmGraph-1',
          'lineAlpha': 0.2,
          'title': 'Загальна кількість',
          'type': 'column',
          'valueField': 'generalCount'
        },
        {
          'balloonText': 'Нагороди:[[value]]',
          'fillAlphas': 0.8,
          'id': 'AmGraph-2',
          'lineAlpha': 0.2,
          'title': 'Нагороди',
          'type': 'column',
          'valueField': 'awardsCount'
        },
        {
          'balloonText': 'Пільги:[[value]]',
          'fillAlphas': 0.8,
          'id': 'AmGraph-3',
          'lineAlpha': 0.2,
          'title': 'Пільги',
          'type': 'column',
          'valueField': 'benefitCount'
        }
      ],
      'guides': [],
      'valueAxes': [
        {
          'id': 'ValueAxis-1',
          'position': 'top',
          'axisAlpha': 0
        }
      ],
      'allLabels': [],
      'balloon': {},
      'titles': [],
      'dataProvider': null,
      'export': {
        'enabled': true
      }
    }
  },
  [PLACES]: {
    callApi: {
      url: '/stats/{{timePeriodId}}/entrants/places',
      params: {},
      cache: true,
      cacheTime: 300
    },
    headers: [
      {key: 'departmentName', title: 'Факультет/Департамент'},
      {key: 'entrantPlace', title: 'Кількість заявок (entrantPlace)'}
    ],
    route: `/statistics/chart/${PLACES}`,
    title: 'Статистика по місцям',
    amChartConfig: {
      theme: 'light',
      type: 'serial',
      dataProvider: null,
      categoryField: 'departmentName',
      depth3D: 20,
      angle: 30,
      categoryAxis: {
        labelRotation: 90,
        gridPosition: 'start'
      },
      valueAxes: [ {
        title: 'Visitors'
      } ],
      graphs: [ {
        balloonText: '<b>[[value]] заяв</b>',
        valueField: 'entrantPlace',
        colorField: 'color',
        type: 'column',
        lineAlpha: 0.1,
        fillAlphas: 1
      } ],
      chartCursor: {
        cursorAlpha: 0,
        zoomable: false,
        categoryBalloonEnabled: true
      },
      export: {
        enabled: true
      }
    }
  },
  [GENDER]: {
    callApi: {
      url: ({specofferId}) => `/stats/{{timePeriodId}}/specoffers/${specofferId}/genders`,
      params: {},
      cache: true,
      cacheTime: 300
    },
    processData: normalizeGenderStat,
    title: 'Гендерна статистика',
    amChartConfig: {
      type: 'pie',
      theme: 'light',
      dataProvider: null,
      valueField: 'value',
      titleField: 'key',
      balloon: {
        fixedPosition: true
      },
      export: {
        enabled: true
      }
    }
  },
};

