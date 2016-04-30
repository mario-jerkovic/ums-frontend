export const DICTIONARY_LOAD_START = 'DICTIONARY_LOAD_START';
export const DICTIONARY_LOAD_SUCCESS = 'DICTIONARY_LOAD_SUCCESS';
export const DICTIONARY_LOAD_FAIL = 'DICTIONARY_LOAD_FAIL';

export const errors = {
  wrongListOfDic: 'List of dic {array of strings} || {sting} must be passed!'
}

// COLLECTION NAMES
export const DEPARTMENTS = 'DEPARTMENTS';
export const ENROLMENTS_TYPES = 'ENROLMENTS_TYPES';
export const ENROLMENTS_STATUS_TYPES = 'ENROLMENTS_STATUS_TYPES';
export const TIMEPERIODS = 'TIMEPERIODS';
export const SPECOFFERS_TYPES = 'SPECOFFERS_TYPES';
export const EDUCATION_FORM_TYPES = 'EDUCATION_FORM_TYPES';

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
  },
  [SPECOFFERS_TYPES]: {
    url: '/specoffers/types',
    params: {
      limit: 300
    },
    cache: true
  },
  [EDUCATION_FORM_TYPES]: {
    url: '/educations/forms/types',
    params: {
      limit: 300
    },
    cache: true
  }
};