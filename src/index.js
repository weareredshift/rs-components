import React from 'react';
import PropTypes from 'prop-types';

import BaseForm from 'components/BaseForm';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import Link from 'components/Link';
import RadioGroup from 'components/RadioGroup';

import { validators } from 'components/BaseForm/utils';

export default {
  BaseForm,
  Checkbox,
  Dropdown,
  Link,
  RadioGroup,
  utils: {
    validators
  }
};
