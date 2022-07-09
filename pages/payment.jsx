import React, {useContext, useEffect, useState} from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/Ui/CheckoutWizard";
import {useRouter} from "next/router";
import {Store} from "../utils/store";
import {toast} from "react-toastify";
import {SAVE_PAYMENT_METHOD} from "../utils/actionTypes";
import Cookies from "js-cookie";

const Payment = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {shippingAddress, paymentMethod} = cart;

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error("Метод оплаты обязателен")
        }
        dispatch({type: SAVE_PAYMENT_METHOD, payload: selectedPaymentMethod})
        Cookies.set("cart", JSON.stringify({...cart, paymentMethod: selectedPaymentMethod}))

        router.push("/placeorder")
    };

    const methodPayments = [
        {id: 1, name: "Сбер", sub: "Sber"},
        {id: 2, name: "Юмани", sub: "YooMoney"},
        {id: 3, name: "Qiwi", sub: "Qiwi"},
        {id: 4, name: "Наличные", sub: "Cash"},
    ];

    useEffect(() => {
        if (!shippingAddress.city && !shippingAddress.home) {
            return router.push("/shipping")
        }
        setSelectedPaymentMethod(paymentMethod || "")
    }, [paymentMethod, router, shippingAddress])

    return (
        <Layout title="Выбор метода оплаты">
            <CheckoutWizard activeStep={2}/>
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-xl">Метод оплаты</h1>
                {methodPayments.map((payment) => (
                    <div key={payment.id} className="mb-4">
                        <input
                            type="radio"
                            id={payment.sub}
                            name="paymentMethod"
                            className="p-4 cursor-pointer outline-none focus:right-0"
                            checked={selectedPaymentMethod === payment.id}
                            onChange={() => setSelectedPaymentMethod(payment.id)}
                        />

                        <label htmlFor={payment.sub} className="p-2 cursor-pointer">{payment.name}</label>
                    </div>
                ))}

                <div className="mb-4 flex justify-between">
                    <button
                        onClick={() => router.push("/shipping")}
                        type="button"
                        className="default-button"
                    >
                        Назад
                    </button>
                    <button className="primary-button">Далее</button>
                </div>
            </form>
        </Layout>
    );
};

export default Payment;