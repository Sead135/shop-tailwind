import React, {useContext} from "react";
import Layout from "../components/Layout";
import {Store} from "../utils/store";
import Link from "next/link";
import Image from "next/image";
import {XCircleIcon} from "@heroicons/react/solid";
import {CART_REMOVE_ITEM} from "../utils/actionTypes";

const Cart = () => {
    const {state, dispatch} = useContext(Store);
    const {
        cart: {cartItems},
    } = state;

    const priceWithSpace = (price) =>
        price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const removeItemHandler = (item) => {
        dispatch({type: CART_REMOVE_ITEM, payload: item});
    };

    return (
        <Layout title="Корзина">
            <h1 className="mb-4 text-xl text-center">Корзина</h1>
            {cartItems.length === 0 ? (
                <div>
                    <h3 className="">Корзина пуста!</h3>
                    <Link href="/">
                        <button className="primary-button">Идемте за покупками...</button>
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
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
                                    <td className="p-5 text-right">{item.quantity}</td>
                                    <td className="p-5 text-right">
                                        {item.price + " руб."}
                                    </td>
                                    <td className="p-5 text-center">
                                        <button onClick={() => removeItemHandler(item)}>
                                            <XCircleIcon className="h-5 w-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 font-bold">
                                    <h6>
                                        Итого:{" "}
                                        <span>
                                          {cartItems.reduce((a, c) => a + c.price, 0)} руб.
                                        </span>
                                    </h6>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Cart;