import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './WrapComponent.jsx';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import topModalReducer  from './reducer/topModal_reducer.js';
import confirmReducer from './reducer/confirm_reducer.js';
import addressReducer from './reducer/address_reducer';

// getter 속성 가져오기 useSelector()
const store = configureStore({
  reducer: {
    topModal: topModalReducer,
    confirm: confirmReducer,
    address: addressReducer,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WrapComponent />
    </Provider>
  </React.StrictMode>
);