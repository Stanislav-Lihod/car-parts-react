import React from "react";
import {Route, Routes} from "react-router-dom";
import {Parts} from "./pages/Parts/Parts";
import {Main} from "./pages/Main/Main";
import {Part} from "./pages/Part/Part";
import {Header} from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Basket} from "./pages/Basket/Basket";
import User from "./pages/User/User";
import NotFoundPage from "./pages/NotFound/NotFound";
export const App = () =>{
  return (
    <>
      <Header/>
      <Routes>
        <Route path={'/parts'} element={<Parts />}/>
        <Route path={'/used-part/:id'} element={<Part />}/>
        <Route path={'/basket'} element={<Basket />}/>
        <Route path={'/user'} element={<User />}/>
        <Route path={'/'} element={<Main />}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </>
  )
}