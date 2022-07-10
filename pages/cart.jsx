import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/store";
import Link from "next/link";
import Image from "next/image";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../utils/actionTypes";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import CostOrder from "../components/CostOrder";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const priceWithSpace = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const removeItemHandler = (item) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: item });
  };

  const updateCartHandler = async (item, type) => {
    const productCount = cartItems.find(
      (product) => product.slug === item.slug
    ).quantity;

    switch (type) {
      case "add": {
        const quantity =
          Number(productCount + 1) > item.countInStocks
            ? item.countInStocks
            : Number(productCount + 1);
        return dispatch({
          type: CART_ADD_ITEM,
          payload: { ...item, quantity },
        });
      }

      case "remove": {
        const quantity =
          Number(productCount - 1) <= 0 ? 0 : Number(productCount - 1);
        return quantity === 0
          ? dispatch({ type: CART_REMOVE_ITEM, payload: item })
          : dispatch({
              type: CART_ADD_ITEM,
              payload: { ...item, quantity },
            });
      }

      default:
        console.log("Nothing");
    }
  };

  return (
    <Layout title="Корзина">
      <h1 className="mb-4 text-xl text-center">Корзина</h1>
      {cartItems.length === 0 ? (
        <div>
          <h3 className="">Корзина пуста!</h3>
          <Link href="/" passHref>
            <button className="primary-button">Идем-те за покупками...</button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3 mb-5">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Наименование</th>
                  <th className="px-5 text-right">Количество</th>
                  <th className="px-5 text-right">Цена</th>
                  <th className="px-5 text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={"/product/" + item.slug}>
                        <a className="flex items-center">
                          <Image
                            src={item.img}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-cover"
                          />
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end">
                        <MinusCircleIcon
                          className="w-5 h-5"
                          onClick={() => updateCartHandler(item, "remove")}
                        />
                        <p className="mx-4">{item.quantity}</p>
                        <PlusCircleIcon
                          className="w-5 h-5"
                          onClick={() => updateCartHandler(item, "add")}
                        />
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      {priceWithSpace(item.price) + " руб."}
                    </td>
                    <td className="p-5 text-right">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card p-5">
              <CostOrder
                cartItems={cartItems}
                priceWithSpace={priceWithSpace}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
