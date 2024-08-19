import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../../../store/redusers/userSlice";
import AddressSkeleton from "../../../components/Preloader/AdressSkeleton/AddressSkeleton";
import * as style from './BasketAddress.module.scss'

export default function BasketAddress(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuth, isLoading, user} = useSelector(state => state.user)

  useEffect(() => {
    !isAuth && navigate('/user')
    isAuth && dispatch(checkUser())
  }, []);
  console.log(user)
  return (
    <div>
      {isLoading ? (
        <AddressSkeleton/>
      ):(
        <form className={style.form}>
          <input type={'text'} value={user.location} readOnly={true}/>
          <input type={'text'} placeholder={'City'} defaultValue={user.city}/>
          <input type={'text'} placeholder={'Address'} defaultValue={user.address}/>
          <input type={'number'} placeholder={'ZipCode'} defaultValue={user.zipCode}/>
          <input type={'text'} placeholder={'First Name'} defaultValue={user.first_name}/>
          <input type={'text'} placeholder={'Second Name'} defaultValue={user.second_name}/>
          <input type={'phone'} placeholder={'Phone number'} defaultValue={user.phone_number}/>
        </form>
      )}

    </div>
  );
}