import React from 'react';
import {Link} from "react-router-dom";
import {ShoppingCartIcon, HeartIcon, UserIcon} from "@heroicons/react/24/outline";
import Search from "./Search/Search";
import * as style from "./Header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/redusers/userSlice";

export const Header = () => {
  const {counter} = useSelector(state => state.basket)
  const {isAuth} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logoutUser = () =>{
    dispatch(logout())
  }

  return (
    <header className={style.header}>
      <div className={`container ${style.content}`}>
        {/*<div className={style.header__top}>*/}
        {/*  <Link to={"/delivery"} className="hover:underline">Delivery</Link>*/}
        {/*  <Link to={"/returns"} className="hover:underline">Returns</Link>*/}
        {/*  <Link to={"/payment"} className="hover:underline">Payment</Link>*/}
        {/*  <Link to={"/contacts"} className="hover:underline">Contacts</Link>*/}
        {/*  <Link to={"/sell"} className="hover:underline">Sell</Link>*/}
        {/*</div>*/}
        <div className={style.header__bottom}>
          <Link to={'/'}>
            <img src="/images/logo.png" alt="Logo" width={80} height={55}/>
          </Link>

          <Search placeholder="Enter the part name"/>
          <div className={style.user_action}>
            <div className={style.user}>
              <Link className={isAuth ? style.isAuth : ''} to={"/user"}>
                <UserIcon className="w-6"/>
              </Link>
              { isAuth && (
                <div className={style.user_menu}>
                  <div onClick={logoutUser}>logout</div>
                </div>
              )}
            </div>
            <Link to={"/wishlist"}>
              <HeartIcon className="w-6"/>
            </Link>
            <Link to={"/basket"}>
              {
                counter > 0 && (<span className={style.counter}>{counter}</span>)
              }
              <ShoppingCartIcon className="w-6"/>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};