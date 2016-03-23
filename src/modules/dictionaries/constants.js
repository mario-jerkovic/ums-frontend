// ACTION TYPES:
export const DICTIONARY = 'DICTIONARY';

// COLLECTION NAMES
export const DEPARTMENTS = 'DEPARTMENTS';
export const ENROLMENTS_TYPES = 'ENROLMENTS_TYPES';
export const ENROLMENTS_STATUS_TYPES = 'ENROLMENTS_STATUS_TYPES';
export const TIMEPERIODS = 'TIMEPERIODS';

// CONSTANTS:
export const DICTIONARY_MAP = {
  [DEPARTMENTS]: {
    url: '/departments',
    params: {
      departmentTypeId: 1,
      limit: 300
    },
    cache: true
  },
  [ENROLMENTS_TYPES]: {
    url: '/enrolments/types',
    params: {
      limit: 300
    },
    cache: true
  },
  [ENROLMENTS_STATUS_TYPES]: {
    url: '/enrolments/statustypes',
    params: {
      limit: 300
    },
    cache: true
  },
  [TIMEPERIODS]: {
    url: '/timeperiods',
    params: {
      limit: 300
    },
    cache: true
  }
};