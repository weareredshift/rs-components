import BaseForm from './components/BaseForm';
import Checkbox from './components/Checkbox';
import Dropdown from './components/Dropdown';
import OutsideClickWatcher from './components/OutsideClickWatcher';
import Link from './components/Link';
import RadioGroup from './components/RadioGroup';
import SortableTable from './components/SortableTable';
import Responder from './components/Responder';
import Loader from './components/Loader';
import RedirectWithFlash from './components/RedirectWithFlash';
import Flash from './components/Flash';
import RenderIf from './components/RenderIf';
import Modal from './components/Modal';
import Tooltip from './components/Tooltip';
import CopyOnClick from './components/CopyOnClick';

import { redirectWithFlash } from './components/RedirectWithFlash/utils';
import { validators } from './components/BaseForm/utils';
import { initReduxBreakpoints, breakpointIsGreaterThan, breakpointIsLessThan, setClass } from './components/Responder/utils';
import { setQueryString, handleQueryStringChange } from './components/Modal/utils';

import * as actions from './store/actions';
import { initReducers } from './store/reducers';
import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './store/boilerplate';

const utils = { validators, initReduxBreakpoints, redirectWithFlash,
  breakpointIsGreaterThan, breakpointIsLessThan, setClass,
  setQueryString, handleQueryStringChange };

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
  RenderIf,
  Modal,
  CopyOnClick,
  Tooltip,
  Loader,
  utils,
  reduxUtils,
  actions
};
