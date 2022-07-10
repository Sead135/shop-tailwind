import React from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";

const Home = ({products}) => {
    return (
        <Layout title="Главная страница">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                    <ProductItem product={product} key={product.slug}/>
                ))}
            </div>
        </Layout>
    );
};

export const getServerSideProps = async () => {
    await db.connect();
    const products = await Product.find().lean()
    await db.disconnect()
    return {
        props: {
            products: products.map(db.convertDocToObj)
        }
    }
}

export default Home;