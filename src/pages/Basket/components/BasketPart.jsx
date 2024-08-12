import React from 'react';
import * as style from "../Basket.module.scss";
import {Link} from "react-router-dom";
import {TrashIcon} from "@heroicons/react/16/solid";
import IconButton from "../../../components/Button/IconButton";

function BasketPart({part, onRemove}) {
  const handleRemoveClick = (event) => {
    if (onRemove){
      onRemove(event, part.part_id);
    }
  };

  return (
    <div className={style.basket__part} key={part.part_id}>
      <IconButton
        style={{
          right: '20px',
          top: '20px'
        }}
        additionalClass={'fill'}
        onClick={handleRemoveClick}
      >
        <TrashIcon style={{width: '16px'}}/>
      </IconButton>
      <div className={style.part__title}>{part.scrapheap.title}</div>
      <div className={style.part__top}>
        <img src={part.image.thumb} alt={part.part_name}/>
        <div className={style.part__top__text}>
          <Link to={`/used-part/${part.part_id}`}>{part.part_id} - {part.part_name}</Link>
          <div dangerouslySetInnerHTML={{__html: part.description}}/>
        </div>
        <div className={style.part__top__price}>
          {part.price_final}
          <span>incl. VAT</span>
        </div>
      </div>
      <div className={style.part__bottom}>
        <div className={style.part__bottom__text}>Delivery (1 - 3 business
          days): <span>{part.delivery_price}</span></div>
      </div>
    </div>
  );
}

export default BasketPart;