import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reducer from "./store/reducers/authreducer";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { Provider } from "react-redux";

const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhance(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
