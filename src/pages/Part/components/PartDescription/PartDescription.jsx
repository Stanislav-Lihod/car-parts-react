import React from "react";
import * as style from './PartDescription.module.scss'
export default function PartDescription({part_name, car_name, part_number}){
  return (
    <div className={`container ${style.part__description}`}>
      <h2 className='mb-20'>{car_name} {part_name}: more information</h2>
      <p className="mb-20">In this category you will also find more spare parts such as {car_name} {part_name} {part_number}. View the description and technical information of the spare part you are interested
        in. Buy the required spare part online and we will deliver it to Europe and beyond within a few business days.
        Autoparts cooperates with reliable auto parts dealers who can guarantee the quality of the offered parts.
      </p>

      <p className="mb-20">Looking for high quality used car parts near you? With an unparalleled selection of used car parts of all
        makes and models, you’ll be sure to find the exact part you need in excellent condition. Autoparts brings
        together more than 3650 car wreck dismantlers and scrap yards and offers a wide choice of genuine secondhand
        car parts. Choose used parts by car make, model and category of car parts you are looking for. For additional
        results, use extra filters and sort car parts by vehicle engine capacity, power, year of manufacture or other
        specifications.
      </p>

      <p className="mb-20">At the moment, on our site you will find more than 19037353 unique ads from different used auto parts dealers.
        No need to go to the wreckage, waste your time on ad portals or go through your phone calls - all used spare
        parts can be found and purchased online in a few clicks at used car parts portal Autoparts. Also, check us on
        Facebook, Youtube and Instagram</p>
    </div>
  )
}