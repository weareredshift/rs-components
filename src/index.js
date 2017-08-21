import BaseForm from './components/BaseForm';
import Checkbox from './components/Checkbox';
import Dropdown from './components/Dropdown';
import OutsideClickWatcher from './components/OutsideClickWatcher';
import Link from './components/Link';
import RadioGroup from './components/RadioGroup';
import SortableTable from './components/SortableTable';
import Responder from './components/Responder';
import RedirectWithFlash from './components/RedirectWithFlash';
import Flash from './components/Flash';

import { redirectWithFlash } from './components/RedirectWithFlash/utils';
import { validators } from './components/BaseForm/utils';
import { initReduxBreakpoints } from './components/Responder/utils';

import * as actions from './store/actions';
import { initReducers } from './store/reducers';
import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './store/boilerplate';

const utils = { validators, initReduxBreakpoints, redirectWithFlash };
const reduxUtils = { constructReducers, curryInjectReducer, curryMakeRootReducer, initReducers };

export {
  BaseForm,
  Checkbox,
  Dropdown,
  Link,
  RadioGroup,
  SortableTable,
  OutsideClickWatcher,
  Responder,
  RedirectWithFlash,
  Flash,

  utils,
  reduxUtils,
  actions
};
