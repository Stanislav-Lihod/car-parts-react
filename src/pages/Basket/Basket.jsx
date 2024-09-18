import React, { useState} from "react";
import * as style from './Basket.module.scss'
import { useSelector} from "react-redux";
import Empty from "../../components/Empty/Empty";
import {GlobeEuropeAfricaIcon, CurrencyEuroIcon, CheckCircleIcon, ShoppingCartIcon, UserIcon} from "@heroicons/react/24/outline";
import {Button} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import BasketParts from "./components/BasketParts";
import BasketAddress from "./components/BasketAddress";
import BasketPayment from "./components/BasketPayment";
import BasketApprove from "./components/BasketApprove";

export const Basket = () =>{
  const navigate = useNavigate()
  const {isAuth} = useSelector(state => state.user)
  const {idPartsInBasket} = useSelector(state => state.basket)
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {icon: <ShoppingCartIcon/>, template: <BasketParts/>, title: 'Shopping cart', button_name: 'Continue'},
    {icon: <UserIcon/>},
    {icon: <GlobeEuropeAfricaIcon/>, template: <BasketAddress/>, title: 'Delivery address', button_name: 'NEXT: Payment'},
    {icon: <CurrencyEuroIcon/>, template: <BasketPayment nextStep={()=>{nextClick()}}/>, title: 'Payment methods'},
    {icon: <CheckCircleIcon/>, template: <BasketApprove/>}
  ]

  const nextClick = () =>{
    if (currentStep === 0){
      return isAuth ? setCurrentStep(2) : navigate('/user')
    }
    setCurrentStep(currentStep + 1)
  }

  const progressClick = (index) =>{
    if (index >= currentStep) return

    if (index === 1){
      return isAuth ? setCurrentStep(2) : navigate('/user')
    }
    setCurrentStep(index)
  }

  return(
    <main className={`${style.basket} container container_short`}>
      {idPartsInBasket.length > 0 ? (
        <>
          <div className={style.progress}>
            {steps.map((step, index) => (
              <div
                onClick={()=>progressClick(index)}
                key={index}
                className={`${style.item} ${index <= currentStep ? style.active : ''}`}
              >
                {step.icon}
              </div>
            ))}
          </div>

          {
            steps[currentStep].title ? <div className={style.title}>{steps[currentStep].title}</div> : null
          }

          {steps[currentStep].template}

          {steps[currentStep].button_name && (
            <Button
              onClick={nextClick}
            >
              {steps[currentStep].button_name}
            </Button>
          )}
        </>
      ) : (
        <Empty additionalClass="w-400">Shopping cart is empty</Empty>
      )}
    </main>
  )
}