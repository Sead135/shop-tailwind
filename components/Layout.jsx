import React, {useContext, useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import {Store} from "../utils/store";
import {ToastContainer} from "react-toastify";
import {useSession} from "next-auth/react";
import "react-toastify/dist/ReactToastify.css"

const Layout = ({children, title}) => {
    const {status, data: session} = useSession();

    const {state} = useContext(Store);
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    return (
        <>
            <Head>
                <meta name="description" content="Магазин одежды"/>
                <title>{title ? title + " | Магазин одежды" : "Магазин одежды"}</title>
                <link type="icon" href="/favicon.ico"/>
            </Head>

            <ToastContainer position="bottom-center" limit={1}/>

            <div className="wrapper flex flex-col min-h-screen">
                <header className="sticky z-50 bg-white top-0">
                    <nav className="flex h-16 justify-between shadow-md items-center px-4">
                        <Link href="/">
                            <a className="text-lg font-bold">Shop</a>
                        </Link>
                        <div className="">
                            <Link href="/cart">
                                <a className="p-2">
                                    Корзина
                                    {cartItemsCount > 0 && (
                                        <span
                                            className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                                    )}
                                </a>
                            </Link>
                            {status === "loading" ? (
                                "Загрузка..."
                            ) : session?.user ? (
                                session.user.name
                            ) : (
                                <Link href="/login">
                                    <a className="p-2">Войти</a>
                                </Link>
                            )}
                        </div>
                    </nav>
                </header>
                <main className="container mx-auto mt-4 px-4">{children}</main>
                <footer className="flex items-center justify-center h-10 shadow-inner">
                    Здесь могла бы быть ваша реклама <span className="px-2">|</span> 2022
                </footer>
            </div>
        </>
    );
};

export default Layout;