import React from 'react';
import * as style from "./Registration.module.scss";
import {useDispatch} from "react-redux";
import {setUser, User} from "../../../store/redusers/userSlice";
import {CheckBadgeIcon} from "@heroicons/react/24/outline";
import {Button} from "../../../components/Button/Button";
import { useRegistrationMutation} from "../../../services/UserService";

export default function Registration({toggleScreen}) {
  const dispatch = useDispatch()
  const [registration] = useRegistrationMutation();
  const onRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements as HTMLFormControlsCollection;
    const formObject: Record<string, string> = {};

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name) {
        formObject[element.name] = element.value;
      }
    }

    try {
      const result = await registration(formObject).unwrap() as { data: User; token: string };
      dispatch(setUser(result));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className={style['registration']}>
      <div>
        <form onSubmit={onRegistration}>
          <div className={style['title']}>
            <CheckBadgeIcon/>
            Registration
          </div>
          <input name='first_name' type='text' placeholder='First name' required/>
          <input name='second_name' type='text' placeholder='Second name' required/>
          <input name='location' type='text' value='Lithuania' readOnly={true}/>
          <input name='email' type='email' placeholder='Email' required/>
          <input name='password' type='password' placeholder='Password' required/>
          <input name='password_confirm' type='password' placeholder='Confirm password' required/>
          <Button
            type='submit'
            additionalStyle={['w_full']}
          >
            Registration
          </Button>
        </form>
      </div>
      <div className={style['notification']}>Do have an account? <span onClick={toggleScreen}>Login</span></div>
    </div>
)
  ;
}