/* eslint no-extend-native:0 */

// ---------------------------------------
// Test Environment Setup
// ---------------------------------------

import React from 'react';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;

global.mockComp = (Component, props = {}) => shallow(<Component { ...props } />);

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// Require all `tests/**/*.spec.js`
const tests = require.context('./components', true, /\.spec\.js$/);

// Only run tests that have changed after the first pass.
const testsToRun = tests.keys().filter(inManifest)
;(testsToRun.length ? testsToRun : tests.keys()).forEach(tests);
