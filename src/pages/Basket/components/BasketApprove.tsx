import React, {useEffect} from 'react';
import {CheckBadgeIcon} from "@heroicons/react/24/outline";
import * as style from '../Basket.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {hideCounter, removeBasket} from "../../../store/redusers/basketSlice";
import {useNavigate} from "react-router-dom";
import {useLazyCheckUserQuery, useUpdateUserMutation} from "../../../services/UserService";
import {setUser} from "../../../store/redusers/userSlice";
import {RootState} from "../../../store/store";

interface Order {
  id: number;
  totalPrice: number;
  date: number;
  parts: Part[];
}

interface User {
  id: number;
  email: string;
  password: string;
  orders?: Order[];
}

interface Part {
  part_id: number;
  image: {
    thumb: string;
  };
  part_name: string;
  price_final: number;
}
export default function BasketApprove() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, isLoading, user } = useSelector((state: RootState) => state.user) as { user: User; isAuth: boolean; isLoading: boolean };
  const { basketParts, totalPrice } = useSelector((state: RootState) => {
    const { basketParts, totalPrice } = state.basket;
    const normalizedParts = basketParts.map((part: any) => ({
      part_id: part.id,
      image: { thumb: part.image },
      part_name: part.name,
      price_final: part.price,
    }));
    return { basketParts: normalizedParts, totalPrice };
  }) as { basketParts: Part[]; totalPrice: { totalPrice: number } };

  const [updateUser] = useUpdateUserMutation();
  const [trigger, { data: authData }] = useLazyCheckUserQuery();

  useEffect(() => {
    if (!isAuth) navigate('/user');

    const currentParts: Part[] = basketParts.map(part => ({
      part_id: part.part_id,
      image: part.image,
      part_name: part.part_name,
      price_final: part.price_final,
    }));

    const orders: Order[] = [
      ...(user.orders ?? []),
      {
        id: Date.now(),
        totalPrice: totalPrice.totalPrice,
        date: Date.now(),
        parts: currentParts,
      },
    ];

    userUpdate(orders);

    dispatch(hideCounter());

    return () => {
      dispatch(removeBasket());
    };
  }, []);

  useEffect(() => {
    if (user.email && user.password) {
      trigger({ email: user.email, password: user.password });
    }
  }, [user]);

  useEffect(() => {
    if (authData) {
      // dispatch(setUser({ data: authData as User, token: '' }));
    }
  }, [authData]);

  const userUpdate = async (orders: Order[]) => {
    const result = await updateUser({ userId: user.id, body: { ...user, orders } });
    if ('data' in result && result.data) {
      // dispatch(setUser({ data: result.data as User, token: '' }));
    }
  };

  return (
    <>
      {isLoading ? (
        'Loading'
      ) : (
        <div className={style['approve']}>
          <CheckBadgeIcon />
          <h2>Your order {Date.now()} was created</h2>
        </div>
      )}
    </>
  );
}