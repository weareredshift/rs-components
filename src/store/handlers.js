import { fromJS } from 'immutable';

export const location = {
  init: '/',
  LOCATION_CHANGE: (state, action) => action.location
};

export const dropdowns = {
  init: fromJS({}),
  SET_DROPDOWN_VALUES: (state, action) => state.merge({ [action.uid]: action.values })
};

export const openDropdownID = {
  init: null,
  SET_OPEN_DROPDOWN_ID: (state, action) => action.uid
};

export const radios = {
  init: fromJS({}),
  SET_RADIO_VALUE: (state, action) => state.merge({ [action.uid]: action.item })
};

export const checkboxes = {
  init: fromJS({}),
  SET_CHECKBOX_VALUE: (state, action) => state.merge({ [action.uid]: action.value })
};

export const sortableTables = {
  init: fromJS({}),
  SORT_TABLE: (state, action) => state.merge({
    [action.uid]: { sortBy: action.sortBy, sortDirection: action.sortDirection }
  })
};

/**
 * Object defining current breakpoint state
 * @type {Object}
 */
export const breakpoint = {
  init: { name: 'default', size: null, queryState: [] },
  SET_ACTIVE_BREAKPOINT: (state, action) => {
    const newobj = {
      name: action.breakpointName,
      size: action.breakpointSize,
      queryState: action.queryState
    };

    return newobj;
  }
};

// NOT YET BUILT
// export const carousels = {
//   init: fromJS({}),
//   SET_CAROUSEL_INDEX: (state, action) => state.setIn([action.carouselID, 'index'], action.index)
// };
// /**
//  * Object defining modal state
//  * @type {Object}
//  */
// export const modal = {
//   init: { open: false, activeID: '' },
//   TOGGLE_MODAL: (state, action) => Object.assign({}, state, { open: action.open }),
//   SET_ACTIVE_MODAL: (state, action) => Object.assign({}, state, { activeID: action.modalID })
// };
// /**
//  * Determines state of expanded content specific to sections of the site
//  *
//  * @type       {string}
//  */
// export const expandedContent = {
//   init: fromJS({}),
//   SET_EXPANDED: (state, action) => state.set(action.section, action.name)
// };
