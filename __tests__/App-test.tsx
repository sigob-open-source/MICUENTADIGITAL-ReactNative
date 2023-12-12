/**
 * @format
 */

import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

// eslint-disable-next-line import/no-unresolved, import/extensions
import App from '../App';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<App />);
});
