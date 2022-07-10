import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/Ui/CheckoutWizard";
import { Store } from "../utils/store";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "./../utils/error";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../utils/actionTypes";

const PlaceOrderScreen = () => {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems, shippingAddress, paymentMethod },
    },
    dispatch,
  } = useContext(Store);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const priceWithSpace = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router, cartItems]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      setLoading(false);

      dispatch({ type: CART_CLEAR_ITEMS });

      router.push("/order/" + data._id);
    } catch (error) {
      setLoading(false);
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Данные заказа">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Данные заказа</h1>
      {cartItems.lenght === 0 ? (
        <div>
          Корзина пустая.
          <Link href="/" passHref>
            <a>На главную</a>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Адрес доставки</h2>
              <ul className="mb-2">
                <li>ФИО: {shippingAddress.fullName}</li>
                <li>
                  Адрес: {shippingAddress.city}, {shippingAddress.street},{" "}
                  {shippingAddress.home},{" "}
                  {shippingAddress.apartmentNumber
                    ? shippingAddress.apartmentNumber + ","
                    : ""}{" "}
                  ({shippingAddress.postalCode})
                </li>
                <li>
                  Телефон:
                  {` +7 (${shippingAddress.phone
                    .toString()
                    .slice(0, 3)}) - ${shippingAddress.phone
                    .toString()
                    .slice(3, 6)} - ${shippingAddress.phone
                    .toString()
                    .slice(6, 8)} - ${shippingAddress.phone
                    .toString()
                    .slice(8, 10)}`}
                </li>
              </ul>
              <div>
                <Link href="/shipping" passHref>
                  <a>Редактировать</a>
                </Link>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Метод оплаты: {paymentMethod}</h2>
              <Link href="/payment" passHref>
                <a>Редактировать</a>
              </Link>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Заказ</h2>
              <table className="min-w-full mb-2">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Наименование</th>
                    <th className="p-5 text-right">Количество</th>
                    <th className="p-5 text-right">Цена</th>
                    <th className="p-5 text-right">Итог</th>
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
                        <p className="mx-4">{item.quantity}</p>
                      </td>
                      <td className="p-5 text-right">
                        {priceWithSpace(item.price) + " руб."}
                      </td>
                      <td className="p-5 text-right">
                        {priceWithSpace(item.price * item.quantity) + " руб."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/cart" passHref>
                <a>Редактировать</a>
              </Link>
            </div>
          </div>

          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Общая сумма</h2>
              <ul>
                <li>
                  <div className="mb-2 justify-between flex">
                    <h6>Товар</h6>
                    <h6>{priceWithSpace(itemsPrice)} руб.</h6>
                  </div>
                </li>

                <li>
                  <div className="mb-2 justify-between flex">
                    <h6>Скидка</h6>
                    <h6>0 руб.</h6>
                  </div>
                </li>

                <li>
                  <div className="mb-2 justify-between flex">
                    <h6>Доставка</h6>
                    <h6>{priceWithSpace(shippingPrice)} руб.</h6>
                  </div>
                </li>

                <li>
                  <div className="mb-2 justify-between flex">
                    <h6>Общая сумма</h6>
                    <h6>{priceWithSpace(totalPrice)} руб.</h6>
                  </div>
                </li>

                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? "Загрузка..." : "Оформить заказ"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

PlaceOrderScreen.auth = true;

export default PlaceOrderScreen;
