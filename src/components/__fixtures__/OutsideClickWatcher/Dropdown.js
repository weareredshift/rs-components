import React from 'react';
import Dropdown from '../../Dropdown';

export default {
  children: <Dropdown
    uid="respond-demo"
    items={ ['close', 'on', 'outside', 'click'] }
    title="Note how I"
  />,
  props: {
    watchables: [{
      classes: ['dropdown'],
      action: { type: 'SET_OPEN_DROPDOWN_ID', id: null },
      stateKey: 'openDropdownID'
    }]
  }
};
