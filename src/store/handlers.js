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

export const openModalID = {
  init: null,
  SET_OPEN_MODAL_ID: (state, action) => {
    // Update URL with modal ID
    if (action.updateURL && window) {
      const url = window.location.pathname + window.location.search;
      let newURL = url.includes('?')
        ? url.replace(
          /modal=([^&]+)/,
          match => action.id
            ? [match.split('=')[0], action.id].join('=')
            : ''
        )
        : url.concat(`?modal=${action.id}`);

      if (newURL[newURL.length - 1] === '?') {
        newURL = newURL.slice(0, newURL.length - 1);
      }

      window.history.pushState({}, null, newURL);
    }

    return action.id;
  }
};

// NOT YET BUILT
// export const carousels = {
//   init: fromJS({}),
//   SET_CAROUSEL_INDEX: (state, action) => state.setIn([action.carouselID, 'index'], action.index)
// };
