import React from 'react';
import * as style from './Login.module.scss'
import {useDispatch} from "react-redux";
import {loginUser} from "../../../store/redusers/userSlice";
import {Button} from "../../../components/Button/Button";
import {UserIcon} from "@heroicons/react/24/outline";

export default function Login({toggleScreen}) {
  const dispatch = useDispatch()
  const onLogin = (e) =>{
    e.preventDefault()
    const formData =  new FormData(e.target)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    dispatch(loginUser(formDataObject))
  }

  return (
    <div className={style.login}>
      <div>
        <form onSubmit={onLogin}>

          <div className={style.title}>
            <UserIcon/>
            Login
          </div>

          <input name='email' type='email' placeholder='Email' required/>
          <input name='password' type='password' placeholder='Password' required/>
          <Button maxWidth={true} type='submit'>Login</Button>
        </form>
      </div>
      <div className={style.notification}>Don’t have an account? <span onClick={toggleScreen}>Register now</span></div>
    </div>
  );
}