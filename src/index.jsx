import { createRoot } from 'react-dom/client';
import React from "react";
import {App} from "./App";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.scss"
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import Error from "./components/Error/Error";

const container = document.getElementById('root');
const root = createRoot(container);

const store = setupStore()

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Error/>
      <App/>
    </BrowserRouter>
  </Provider>
);;