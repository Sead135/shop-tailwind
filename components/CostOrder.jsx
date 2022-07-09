import React, {useEffect, useState} from "react";
import promo from "../utils/promo";
import {LoginIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";

const CostOrder = ({cartItems, priceWithSpace}) => {
    const router = useRouter()
    const [promoCode, setPromoCode] = useState({sale: 0, message: ""});
    const [inputPromo, setInputPromo] = useState("");
    const costOrder = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
    const sale =
        promoCode.sale <= 1
            ? parseFloat((costOrder * promoCode.sale).toFixed(2))
            : promoCode.sale > 1
                ? promoCode.sale
                : 0;
    console.log(sale)
    const costWithSale = parseFloat((costOrder - sale).toFixed(2))

    const checkPromoCode = () => {
        const dateObj = new Date();
        const currentDate =
            dateObj.getDay() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear();

        const findPromo = promo.find((item) => item.code === inputPromo);
        if (findPromo && new Date(findPromo.date) > new Date(currentDate))
            setPromoCode({sale: findPromo.sale, message: ""});
        else setPromoCode({sale: 0, message: "Такого промокода не существует!"});
    };


    return (
        <div className="relative">
            <h6 className="font-bold mb-5">
                Итого:{" "}
                <span>
          {priceWithSpace(costWithSale)}
                    руб.
        </span>
            </h6>
            <div className="flex mb-5 gap-3 input__promo">
                <div className="absolute bg-white px-6 py-4 card top-20 info__sale">
                    <ul>
                        <li>Скидка 20% - SALE20</li>
                        <li>Скидка 99% - BIGWIN</li>
                        <li>Скидка 1000р - 1000IN</li>
                    </ul>
                </div>
                <input
                    type="text"
                    className="border rounded w-full px-2"
                    placeholder="Промокод"
                    value={inputPromo}
                    onChange={(e) => setInputPromo(e.target.value)}
                    id="enter-promo"
                />
                <button
                    className="primary-button disabled:bg-gray-400 disabled:text-gray-500"
                    onClick={checkPromoCode}
                    disabled={!inputPromo}
                >
                    <LoginIcon className="w-5 h-5 "/>
                </button>
            </div>
            {promoCode.message && <span className="mb-5">{promoCode.message}</span>}
            <h6 className="font-bold mb-5">
                Скидка: {priceWithSpace(sale)}
                руб.
            </h6>
            <button
                onClick={() =>
                    router.push("/shipping")
                }
                className="primary-button w-full"
            >
                Заказать
            </button>
        </div>
    );
};

export default CostOrder;