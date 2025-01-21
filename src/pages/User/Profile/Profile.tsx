import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../../../components/Button/Button";
import * as style from './Profile.module.scss'
import {setUser, User} from "../../../store/redusers/userSlice";
import {useLazyCheckUserQuery, useUpdateUserMutation} from "../../../services/UserService";
import {RootState} from "../../../store/store";

export default function Profile() {
  const dispatch = useDispatch()
  const {user} = useSelector((state:RootState) => state.user)
  const [updateUser] = useUpdateUserMutation();
  const [trigger, { data: authData}] = useLazyCheckUserQuery();

  const userUpdate = async (e) =>{
    e.preventDefault()
    const formElements = e.currentTarget.elements as HTMLFormControlsCollection;
    const formObject: Record<string, string> = {};

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name) {
        formObject[element.name] = element.value;
      }
    }
    const result = await updateUser(formObject).unwrap() as { data: User; token: string };
    if (result){
      dispatch(setUser(result))
    }
  }

  useEffect(() => {
    if (user.email && user.password){
      trigger({
        email: user.email,
        password: user.password,
      })
    }
  }, [user]);

  useEffect(()=>{
    if (authData){
      // dispatch(setUser(authData))
    }
  }, [authData])

  return (
    <form onSubmit={userUpdate} className={style['profile']}>
      <div className={style['item']}>
        <h3>Edit Profile</h3>
        <div className={style['content']}>
          <input type='text' name="first_name" placeholder="First name" defaultValue={user.first_name}/>
          <input type='text' name="second_name" placeholder="Second name" defaultValue={user.second_name}/>
          <input type='text' name="location" placeholder="Location" defaultValue={user.location} readOnly={true}/>
          <input type='text' name="city" placeholder="City" defaultValue={user.city}/>
          <input type='text' name="address" placeholder="Address" defaultValue={user.address}/>
          <input type='phone' name="phone_number" placeholder="Phone number" defaultValue={user.phone_number}/>
        </div>
      </div>
      <div className={style['item']}>
        <h3>Change Password</h3>
        <div className={style['content']}>
          <input type='password' placeholder="Password"/>
          <input type='password' placeholder="Repeat Password"/>
        </div>
      </div>
      <Button type='submit'>Save</Button>
    </form>
  );
}