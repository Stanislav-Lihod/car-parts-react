import React from 'react';
import * as style from './Error.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {clearError} from "../../store/redusers/errorSlice";

function Error(props) {
  const message = useSelector((state) => state.error.message);
  const dispatch = useDispatch();

  if (!message) return null;

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <div className={style.error}>
      <p>{message}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default Error;