import React, {useContext, useEffect} from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/Ui/CheckoutWizard";
import {useForm} from "react-hook-form";
import {Store} from "../utils/store";
import {SAVE_SHIPPING_ADDRESS} from "../utils/actionTypes";
import Cookies from "js-cookie";
import cart from "./cart";
import {useRouter} from "next/router";

const ShippingScreen = () => {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    } = useForm();
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {shippingAddress} = cart;

    useEffect(() => {
        setValue("fullName", shippingAddress.fullName);
        setValue("city", shippingAddress.city);
        setValue("street", shippingAddress.street);
        setValue("home", shippingAddress.home);
        setValue("apartmentNumber", shippingAddress.apartmentNumber);
        setValue("postalCode", shippingAddress.postalCode);
        setValue("phone", shippingAddress.phone);
    }, [setValue, shippingAddress]);

    const submitHandler = ({ fullName, city, street, home, apartmentNumber, postalCode, phone }) => {
        dispatch({
            type: SAVE_SHIPPING_ADDRESS,
            payload: { fullName, city, street, home, apartmentNumber, postalCode, phone },
        });
        Cookies.set(
            "cart",
            JSON.stringify({
                ...cart,
                shippingAddress: { fullName, city, street, home, apartmentNumber, postalCode, phone },
            })
        );

        router.push("/payment")
    };

    return (
        <Layout title="Оформление заказа">
            <CheckoutWizard activeStep={1}/>
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Адрес доставки</h1>
                <div className="mb-4">
                    <label htmlFor="fullName">ФИО</label>
                    <input
                        {...register("fullName", {required: "Пожалуйста введите ФИО."})}
                        className="w-full"
                        id="fullName"
                        type="text"
                        autoFocus
                    />
                    {errors.fullName && (
                        <span className="text-red-500">{errors.fullName.message}</span>
                    )}
                </div>
                <div className="flex w-full gap-5">
                    <div className="mb-4 w-full">
                        <label htmlFor="city">Город</label>
                        <input
                            {...register("city", {
                                required: "Пожалуйста укажите город доставки.",
                                minLength: {
                                    value: 3,
                                    message: "Укажите дествительный город доставки.",
                                },
                            })}
                            className="w-full"
                            id="city"
                            type="text"
                        />
                        {errors.city && (
                            <span className="text-red-500">{errors.city.message}</span>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="street">Улица</label>
                        <input
                            {...register("street", {
                                required: "Пожалуйста укажите улицу доставки.",
                                minLength: {
                                    value: 3,
                                    message: "Укажите дествительную улицу доставки.",
                                },
                            })}
                            className="w-full"
                            id="street"
                            type="text"
                        />
                        {errors.street && (
                            <span className="text-red-500">{errors.street.message}</span>
                        )}
                    </div>
                    <div className="flex w-3/4 gap-5">
                        <div className="mb-4 w-full">
                            <label htmlFor="home">Дом</label>
                            <input
                                {...register("home", {
                                    required: "Номер дома.",
                                })}
                                className="w-full"
                                id="home"
                                type="text"
                            />
                            {errors.home && (
                                <span className="text-red-500">{errors.home.message}</span>
                            )}
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="apartmentNumber">Квартира</label>
                            <input
                                {...register("apartmentNumber")}
                                className="w-full"
                                id="apartmentNumber"
                                type="number"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="mb-4 w-full">
                        <label htmlFor="postalCode">Почтовый индекс</label>
                        <input
                            {...register("postalCode", {
                                required: "Пожалуйста укажите почтовый индекс.",
                            })}
                            className="w-full"
                            id="postalCode"
                            type="number"
                        />
                        {errors.postalCode && (
                            <span className="text-red-500">{errors.postalCode.message}</span>
                        )}
                    </div>
                    <div className="mb-4 w-full relative">
                        <label htmlFor="phone">Номер телефона</label>
                        <input
                            {...register("phone", {
                                required: "Пожалуйста укажите номер телефона.",
                                maxLength: {
                                    value: 10,
                                    message: "Слишком длинный номер телефона",
                                },
                            })}
                            className="w-full pl-8"
                            id="phone"
                            type="number"
                        />
                        <span className="absolute top-[29px] left-2">+7</span>
                        {errors.phone && (
                            <span className="text-red-500">{errors.phone.message}</span>
                        )}
                    </div>
                </div>
                <button className="primary-button">Далее</button>
            </form>
        </Layout>
    );
};

ShippingScreen.auth = true

export default ShippingScreen;