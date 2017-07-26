import { fromJS } from 'immutable';

export const location = {
  _init: '/',
  LOCATION_CHANGE: (state, action) => action.location
};

export const dropdowns = {
  _init: fromJS({}),
  SET_DROPDOWN_VALUES: (state, action) => state.merge({ [action.id]: action.values })
};

export const openDropdownID = {
  _init: null,
  SET_OPEN_DROPDOWN_ID: (state, action) => action.id
};

export const radios = {
  _init: fromJS({}),
  SET_RADIO_VALUE: (state, action) => state.merge({ [action.groupID]: action.item })
};

export const checkboxes = {
  _init: fromJS({}),
  SET_CHECKBOX_VALUE: (state, action) => state.merge({ [action.boxID]: action.value })
};

export const carousels = {
  _init: fromJS({}),
  SET_CAROUSEL_INDEX: (state, action) => state.setIn([action.carouselID, 'index'], action.index)
};

/**
 * Object defining current breakpoint state
 * @type {Object}
 */
export const breakpoint = {
  _init: { name: 'default', size: null, queryState: [] },
  SET_ACTIVE_BREAKPOINT: (state, action) => {
    const newobj = {
      name: action.breakpointName,
      size: action.breakpointSize,
      queryState: action.queryState
    };

    return newobj;
  }
};

/**
 * Object defining modal state
 * @type {Object}
 */
export const modal = {
  _init: { open: false, activeID: '' },
  TOGGLE_MODAL: (state, action) => Object.assign({}, state, { open: action.open }),
  SET_ACTIVE_MODAL: (state, action) => Object.assign({}, state, { activeID: action.modalID })
};

/**
 * Determines state of expanded content specific to sections of the site
 *
 * @type       {string}
 */
export const expandedContent = {
  _init: fromJS({}),
  SET_EXPANDED: (state, action) => state.set(action.section, action.name)
};
