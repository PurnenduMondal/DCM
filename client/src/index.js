import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { auth } from './functions/firebase';

const persistConfig = {
  transforms: [
    encryptTransform({
      secretKey: "getSecretKeyFromServer",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  key: 'root',
  storage,
}
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
}
const rootReducer = combineReducers({ user: userReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer);
let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

