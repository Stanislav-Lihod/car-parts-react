import { createRoot } from 'react-dom/client';
import React from "react";
import {App} from "./App";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.scss"
import {Header} from "./components/Header/Header";
import {Parts} from "./pages/Parts/Parts";
import {Part} from "./pages/Part/Part";
import {Main} from "./pages/Main/Main";
import Footer from "./components/Footer/Footer";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path={'/parts'} element={<Parts />}/>
      <Route path="/used-part/:id" element={<Part />}/>
      <Route path={'/'} element={<Main />}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
);;