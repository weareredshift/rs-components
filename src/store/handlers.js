import { fromJS } from 'immutable';
import { setQueryString } from '../components/Modal/utils';

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

export const openTooltipID = {
  init: fromJS(null),
  SET_ACTIVE_TOOLTIP: (state, action) => action.tooltipID
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

export const openModal = {
  init: fromJS({}),
  SET_OPEN_MODAL: (state, action) => {
    const { id, updateURL, data } = action;
    // Update URL with modal ID
    if (updateURL) {
      setQueryString('modal', id);
    }

    return fromJS({ id, data: id ? data : {} });
  }
};

// NOT YET BUILT
// export const carousels = {
//   init: fromJS({}),
//   SET_CAROUSEL_INDEX: (state, action) => state.setIn([action.carouselID, 'index'], action.index)
// };
