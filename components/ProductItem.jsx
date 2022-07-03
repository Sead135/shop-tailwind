import React from "react";
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={"/product/" + product.slug}>
        <a className="">
          <img
            src={product.img}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={"/product/" + product.slug}>
          <a className="">
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price + "руб."}</p>
        <button className="primary-button" type="button">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
