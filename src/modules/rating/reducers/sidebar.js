import * as types from '../constants';

const initialSideBarState = {
  helpIsOpen: false,
  genderStatIsOpen: false,
};

export default function sideBar(state = initialSideBarState, action = {}) {
  switch (action.type) {
    case types.OPEN_HELP_SIDEBAR:
      return Object.assign({}, state, {helpIsOpen: action.payload.isOpen});

    case types.OPEN_GENDER_STAT_SIDEBAR:
      return Object.assign({}, state, {genderStatIsOpen: action.payload.isOpen});
    
    default:
      return state;
  }
}

