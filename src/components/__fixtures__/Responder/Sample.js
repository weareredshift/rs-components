import React from 'react';

export default {
  props: {
    classes: {
      tabletSm: 'hidden',
      default: ''
    }
  },
  children: (<div className="whatever">
    I show up only on big screens.
    This won't work here, because we haven't attached breakpoint listeners to AppWrapper.
  </div>)
};
