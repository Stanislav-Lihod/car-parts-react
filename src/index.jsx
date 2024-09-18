import { createRoot } from 'react-dom/client';
import React from "react";
import { StrictMode } from 'react';
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import "./styles/main.scss"
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import Error from "./components/Error/Error";

const container = document.getElementById('root');
const root = createRoot(container);

const store = setupStore()

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Error/>
        <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);