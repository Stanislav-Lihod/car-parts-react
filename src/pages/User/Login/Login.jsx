import React from 'react';
import * as style from './Login.module.scss'
import {useDispatch} from "react-redux";
import {loginUser} from "../../../store/redusers/userSlice";

export default function Login(props) {
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
    <section className={style.login}>
      <div className={'container'}>
        <form onSubmit={onLogin}>
          <input name='email' type='email' placeholder='email'/>
          <input name='password' type='password' placeholder='password'/>
          <button type='submit'>Login</button>
        </form>
      </div>
    </section>
  );
}