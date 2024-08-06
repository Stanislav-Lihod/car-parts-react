import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {ShoppingCartIcon, HeartIcon, UserIcon} from "@heroicons/react/24/outline";
import Search from "./Search/Search";
import * as style from "./Header.module.scss"

export const Header = () => {
  const location = useLocation()

  return (
    <header className={style.header}>
      <div className={`container ${style.content}`}>
        <div className={style.header__top}>
          <Link to={"/delivery"} className="hover:underline">Delivery</Link>
          <Link to={"/returns"} className="hover:underline">Returns</Link>
          <Link to={"/payment"} className="hover:underline">Payment</Link>
          <Link to={"/contacts"} className="hover:underline">Contacts</Link>
          <Link to={"/sell"} className="hover:underline">Sell</Link>
        </div>
        <div className={style.header__bottom}>
          <Link to={'/'}>
            <img src="/logo.png" alt="Logo" width={80} height={55}/>
          </Link>

          <Search placeholder="Enter the part number, manufacturer or model"/>
          <div className={style.user_action}>
            <Link to={"/login"}>
              <UserIcon className="w-6"/>
            </Link>
            <Link to={"/wishlist"}>
              <HeartIcon className="w-6"/>
            </Link>
            <Link to={"/basket"}>
              <ShoppingCartIcon className="w-6"/>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};