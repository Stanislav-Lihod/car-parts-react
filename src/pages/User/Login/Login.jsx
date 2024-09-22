import React from 'react';
import * as style from './Login.module.scss'
import {Button} from "../../../components/Button/Button";
import {UserIcon} from "@heroicons/react/24/outline";
import {useLoginUserMutation} from "../../../services/UserService";
import {useDispatch} from "react-redux";
import {setUser} from "../../../store/redusers/userSlice";

export const Login = ({toggleScreen}) =>{
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  const onLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const result = await loginUser(formDataObject).unwrap();
    dispatch(setUser(result));
  };

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
          <Button
            type='submit'
            additionalStyle={['w_full']}
          >
            Login
          </Button>
        </form>
      </div>
      <div className={style.notification}>Don’t have an account? <span onClick={toggleScreen}>Register now</span></div>
    </div>
  );
}