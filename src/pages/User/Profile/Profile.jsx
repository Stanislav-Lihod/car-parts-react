import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../../../components/Button/Button";
import * as style from './Profile.module.scss'
import {updateUser} from "../../../store/redusers/userSlice";

export default function Profile(props) {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)

  const userUpdate = (e) =>{
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    dispatch(updateUser(formDataObject))
  }

  return (
    <form onSubmit={userUpdate} className={style.profile}>
      <div className={style.item}>
        <h3>Edit Profile</h3>
        <div className={style.content}>
          <input type='text' name="first_name" placeholder="First name" defaultValue={user.first_name}/>
          <input type='text' name="second_name" placeholder="Second name" defaultValue={user.second_name}/>
          <input type='text' name="location" placeholder="Location" defaultValue={user.location} readOnly={true}/>
          <input type='text' name="city" placeholder="City" defaultValue={user.city}/>
          <input type='text' name="address" placeholder="Adress" defaultValue={user.adress}/>
          <input type='phone' name="phone_number" placeholder="Phone number" defaultValue={user.phone_number}/>
        </div>
      </div>
      <div className={style.item}>
        <h3>Change Password</h3>
        <div className={style.content}>
          <input type='password' placeholder="Password"/>
          <input type='password' placeholder="Repeat Password"/>
        </div>
      </div>
      <Button type='submit'>Save</Button>
    </form>
  );
}