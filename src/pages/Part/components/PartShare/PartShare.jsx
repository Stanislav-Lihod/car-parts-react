import {HeartIcon, ShareIcon, Square2StackIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import * as style from './PartShare.module.scss'
import React from "react";

export default function PartShare({id}){
  return (
    <div className={style.partshare}>
      <p>Item code in system: <Link to={`/part/${id}`}>{id}</Link></p>
      <div className={style.partshare__social}>
        <Link to={"/login"}>
          <Square2StackIcon className="w-6"/>
        </Link>
        <Link to={"/wishlist"}>
          <HeartIcon className="w-6"/>
        </Link>
        <Link to={"/basket"}>
          <ShareIcon className="w-6"/>
        </Link>
      </div>
    </div>
  )
}