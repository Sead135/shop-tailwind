import React, {useContext} from "react";
import Link from "next/link";
import {CART_ADD_ITEM} from "../utils/actionTypes";
import {Store} from "../utils/store";
import Image from "next/image";

const ProductItem = ({product}) => {
    const {state, dispatch} = useContext(Store);

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find(
            (item) => item.slug === product.slug
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;
        dispatch({type: CART_ADD_ITEM, payload: {...product, quantity}});
    };

    return (
        <div className="card">
            <Link href={"/product/" + product.slug}>
                <a className="">
                    <Image
                        src={product.img}
                        alt={product.name}
                        title={product.name}
                        className="rounded shadow"
                        width={600}
                        height={866}
                    />
                </a>
            </Link>

            <div className="flex flex-col items-center justify-center p-5">
                <div className="flex justify-between items-center w-full">
                    <div className="overflow-hidden mr-2">
                        <Link href={"/product/" + product.slug}>
                            <a className="">
                                <h2 className="text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">
                                    {product.name}
                                </h2>
                            </a>
                        </Link>
                        <p className="mb-2">{product.brand}</p>
                    </div>
                    <p>{product.price + "руб."}</p>
                </div>
                <button
                    className="primary-button w-full disabled:bg-gray-400 disabled:text-gray-500"
                    type="button"
                    onClick={addToCartHandler}
                    disabled={product.countInStocks <= 0}
                >
                    В корзину
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
