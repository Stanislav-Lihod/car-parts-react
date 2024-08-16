import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../../../store/redusers/userSlice";
import AddressSkeleton from "../../../components/Preloader/AdressSkeleton/AddressSkeleton";

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
        <div>
          <input type={'text'} value={user.location} readOnly={true}/>
          <input type={'text'} placeholder={'City'}/>
          <input type={'text'} placeholder={'Address'}/>
          <input type={'number'} placeholder={'ZipCode'}/>
          <input type={'text'} placeholder={'First Name'} defaultValue={user.first_name}/>
          <input type={'text'} placeholder={'Second Name'} defaultValue={user.second_name}/>
          <input type={'phone'} placeholder={'Phone number'}/>
        </div>
      )}

    </div>
  );
}