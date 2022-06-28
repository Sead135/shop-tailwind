import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({children, title}) => {
    return (
        <>
            <Head>
                <meta name="description" content="Магазин одежды"/>
                <title>{title ? title + " | Магазин одежды" : "Магазин одежды"}</title>
                <link type="icon" href="/favicon.ico"/>
            </Head>

            <div className="wrapper flex flex-col min-h-screen">
                <header>
                    <nav className="flex h-16 justify-between shadow-md items-center px-4">
                        <Link href="/">
                            <a className="text-lg font-bold">Shop</a>
                        </Link>
                        <div className="">
                            <Link href="/cart">
                                <a className="p-2">Корзина</a>
                            </Link>
                            <Link href="/login">
                                <a className="p-2">Войти</a>
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">{children}</main>
                <footer className="flex items-center justify-center h-10 shadow-inner">Здесь могла бы быть ваша реклама <span className="px-2">|</span> 2022</footer>
            </div>
        </>
    );
};

export default Layout;