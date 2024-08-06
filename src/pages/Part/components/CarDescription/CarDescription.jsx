import React from "react";
import * as style from './CarDescription.module.scss'

const data = [
  {
    title: 'Manufacturer',
    description: 'Volkswagen',
    link: 'https://rrr.lt/en/cars-list/volkswagen'
  },{
    title: 'Manufacturer',
    description: 'Volkswagen',
    link: 'https://rrr.lt/en/cars-list/volkswagen'
  },{
    title: 'Series',
    description: 'Multivan',
    link: 'https://rrr.lt/en/cars-list/volkswagen/multivan_1057'
  },{
    title: 'Model',
    description: 'Multivan T5',
    link: 'https://rrr.lt/en/cars-list/volkswagen/multivan-t5-2003-2015'
  },{
    title: 'Year',
    description: '2003-2015',
  },{
    title: 'Model year',
    description: '2008',
  },{
    title: 'Body type',
    description: 'Other',
  },{
    title: 'Steering wheel position',
    description: 'Left',
  },{
    title: 'Fuel type',
    description: 'Disiel',
  },{
    title: 'Driving wheels',
    description: '-',
  },{
    title: 'Gearbox type',
    description: 'Manual',
  },{
    title: 'Color',
    description: '-',
  },
]

export default function CarDescription (){
  return(
    <div className={style.car__description}>
      <h3>Car Description</h3>
      <dl className="">
        {/*{data.map(el => (*/}
        {/*  <dt>{el.title}</dt>*/}
        {/*  <dd>{el.link ? `<a href="${el.link}">${el.description}</a>` : el.description>}</dd>*/}
        {/*))}*/}
      </dl>
    </div>
  )
}