import React, {useEffect, useState} from 'react';
import Login from "./Login/Login";
import * as style from './User.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {checkUser, logoutUser} from "../../store/redusers/userSlice";
import Registration from "./Registration/Registration";
import Orders from "./Orders/Orders";
import Profile from "./Profile/Profile";
import Loading from "../../components/Preloader/Loading";

export default function User(props) {

  const dispatch = useDispatch()
  const {isAuth, isLoading, user} = useSelector(state => state.user)
  const [registrationPage, setRegistrationPage] = useState(false)
  const [currentProfilePage, setCurrentProfilePage] = useState('order')

  useEffect(()=>{
    dispatch(checkUser())
  }, [])

  const logout = ()=>{
    dispatch(logoutUser())
  }

  const toggleLoginScreen = () => {
    setRegistrationPage(prevState => !prevState)
  }
  const toggleProfileScreen = (e) => {
    if (!e.target.classList.contains(style.active)){
      setCurrentProfilePage(
        currentProfilePage === 'order' ? 'edit' : 'order'
      )
    }
  }

  return (
    <main className={style.user}>
      <div className={'container container_short'}>
        { isLoading ? (
          <Loading/>
        ):(
          isAuth ? (
            <>
              <div className={style.titles}>
                <div
                  className={`${style.title} ${currentProfilePage === 'order' ? style.active : ''}`}
                  onClick={toggleProfileScreen}
                >
                  My orders
                </div>
                <div
                  className={`${style.title} ${currentProfilePage === 'edit' ? style.active : ''}`}
                  onClick={toggleProfileScreen}
                >
                  Edit Profile
                </div>
              </div>
              {currentProfilePage === 'order' ? <Orders/> : <Profile/>}
            </>
          ) : (
            registrationPage
              ? <Registration toggleScreen={() => toggleLoginScreen()}/>
              : <Login toggleScreen={() => toggleLoginScreen()}/>
          )
        ) }
        {}
      </div>
    </main>
  );
}