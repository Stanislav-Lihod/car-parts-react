import React from 'react';
import * as style from "./Registration.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../../store/redusers/userSlice";
import {CheckBadgeIcon, UserIcon} from "@heroicons/react/24/outline";
import {Button} from "../../../components/Button/Button";

export default function Registration({toggleScreen}) {
  const dispatch = useDispatch()
  const onRegistration = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    dispatch(registerUser(formDataObject))
  }

  return (
    <div className={style.registration}>
      <div>
        <form onSubmit={onRegistration}>
          <div className={style.title}>
            <CheckBadgeIcon/>
            Registration
          </div>
          <input name='first_name' type='text' placeholder='First name'/>
          <input name='second_name' type='text' placeholder='Second name'/>
          <input name='location' type='text' value='Lithuania' readOnly={true}/>
          <input name='email' type='email' placeholder='email'/>
          <input name='password' type='password' placeholder='password'/>
          <input name='password_confirm' type='password' placeholder='password'/>
          <Button maxWidth={true} type='submit'>Registration</Button>
        </form>
      </div>
      <div className={style.notification}>Do have an account? <span onClick={toggleScreen}>Login</span></div>
    </div>
)
  ;
}