import React, {useEffect, useState} from 'react';
import Login from "./Login/Login";
import * as style from './User.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {checkUser, logoutUser} from "../../store/redusers/userSlice";
import Registration from "./Registration/Registration";

export default function User(props) {

  const dispatch = useDispatch()
  const {isAuth, isLoading, user} = useSelector(state => state.user)
  const [registrationPage, setRegistrationPage] = useState(false)

  useEffect(()=>{
    dispatch(checkUser())
  }, [])

  const logout = ()=>{
    dispatch(logoutUser())
  }

  if (isLoading) return 'Loading'

  return (
    <section className={style.user}>
      <div className={'container'}>
        {isAuth ? (
          `Hello ${user.first_name}`
        ) : (
          registrationPage ? <Registration/> : <Login/>
        )}
      </div>
      {!isAuth
        ? <button onClick={() => setRegistrationPage(prevState => !prevState)}>Toggle Registration Page</button>
        : <button onClick={logout}>Logout</button>
      }
    </section>
  );
}