import React from 'react';
import * as style from "./Registration.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../../store/redusers/userSlice";

export default function Registration(props) {
  const dispatch = useDispatch()
  const onRegistration = (e) =>{
    e.preventDefault()
    const formData =  new FormData(e.target)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    dispatch(registerUser(formDataObject))
  }

  return (
    <section className={style.registration}>
      <div className={'container'}>
        <form onSubmit={onRegistration}>
          <input name='first_name' type='text' placeholder='First name'/>
          <input name='second_name' type='text' placeholder='Second name'/>
          <input name='location' type='text' value='Lithuania' readOnly={true}/>
          <input name='email' type='email' placeholder='email'/>
          <input name='password' type='password' placeholder='password'/>
          <input name='password_confirm' type='password' placeholder='password'/>
          <button type='submit'>Registration</button>
        </form>
      </div>
    </section>
  );
}