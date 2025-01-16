import React from "react";
import * as style from './AlternativeParts.module.scss'
import {Part} from "../../Part";
import {Link} from "react-router-dom";

export default function AlternativeParts(){
  const partCode = "7A0819021"
  return (
    <div className="container mt-8 mb-8 gap-3 flex flex-col">
      <h2 className="text-lg font-bold">Alternative offers for <Link className="text-cyan-700" to={`/search?q=${partCode}`}>{partCode}</Link></h2>
      <Part id={123}/>
      <Part id={321}/>
    </div>
  )
}