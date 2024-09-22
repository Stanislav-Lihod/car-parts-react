import React, {useEffect, useState} from 'react';
import * as style from './Error.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {clearError} from "../../store/redusers/errorSlice";
import {XCircleIcon} from "@heroicons/react/16/solid";

function Error() {
  const message = useSelector((state) => state.error.message);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!message) return;

    setActive(true);

    const hideError = setTimeout(() => {
      setActive(false);
      setTimeout(dispatch, 300, clearError());
    }, 3000);

    return () => clearTimeout(hideError);
  }, [message]);

  if (!message) return null;

  const handleClose = () => {
    setActive(false);
    setTimeout(dispatch, 300, clearError());
  };

  return (
    <div className={`${style.error} ${active ? style.active : ''}`}>
      <p>{message.replace(/_/g, ' ')}</p>
      <XCircleIcon className={style.close} onClick={handleClose}/>
    </div>
  );
}

export default Error;