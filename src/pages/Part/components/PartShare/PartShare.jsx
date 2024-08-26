import {HeartIcon, ShareIcon, Square2StackIcon} from "@heroicons/react/24/outline";
import {Link, useLocation} from "react-router-dom";
import * as style from './PartShare.module.scss'
import React from "react";

export default function PartShare({id, wishlistHandler, inWishlist}){
  const location = useLocation()
  const copy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${location.pathname}`)
  }

  return (
    <div className={style.partshare}>
      <p>Item code in system: <Link to={`/used-part/${id}`}>{id}</Link></p>
      <div className={style.partshare__social}>
        <HeartIcon
          onClick={wishlistHandler}
          className={`w-6 ${inWishlist ? style.active : ''}`}/>
        <Square2StackIcon
          onClick={copy}
          className="w-6"/>
      </div>
    </div>
  )
}