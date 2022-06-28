import React from 'react';
import Layout from "../components/Layout";
import Head from "next/head";

const Home = () => {
    return (
        <>
            <Layout title="Главная страница">
                <div className="text-red-800">Hello</div>
            </Layout>
        </>
    );
};

export default Home;