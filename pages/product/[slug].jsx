import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import data from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/store";
import { CART_ADD_ITEM } from "../../utils/actionTypes";
import ButtonCart from "../../components/Ui/ButtonCart";

const ProductScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((item) => item.slug.toString() === slug);

  if (!product) {
    return (
      <Layout title="Товар не найден">
        <div className="w-full h-full m-auto flex items-center justify-center">
          <h1>Товар не найден!</h1>
        </div>
      </Layout>
    );
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: CART_ADD_ITEM, payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <Link href="/">
        <button className="primary-button mb-2">Назад</button>
      </Link>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.img}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            className="object-cover rounded"
          />
        </div>

        <div className="">
          <ul className="">
            <li className="">
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li className="">
              <p className="">
                Рейтинг: {product.rating} ({product.numReview})
              </p>
            </li>
            <li className="">
              <p className="">Производитель: {product.brand}</p>
            </li>
          </ul>

          <div className="">
            <p className="">{product.description}</p>
          </div>
        </div>

        <div className="">
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <h6 className="">Цена</h6>
              <p className="font-bold">{product.price + "руб."}</p>
            </div>

            <div className="mb-2 flex justify-between">
              <h6 className="">Статус</h6>
              <p className="font-bold">
                {product.countInStocks > 10
                  ? "В наличии"
                  : product.countInStocks <= 0
                  ? "Нет в наличии"
                  : "Осталось " + product.countInStocks}
              </p>
            </div>

            <ButtonCart
              disabled={
                product.countInStocks <= 0 ||
                state.cart.cartItems.find(
                  (item) => item.quantity === item.countInStocks
                )
              }
              buttonHandler={addToCartHandler}
            >
              Добавить в корзину
            </ButtonCart>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;