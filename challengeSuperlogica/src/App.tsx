import React from 'react';
import { Provider } from 'react-redux';
// import { StatusBar } from 'react-native';

import Main from './pages/Main';

import { store } from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
