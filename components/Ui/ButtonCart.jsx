import React from 'react';

const ButtonCart = ({disabled, buttonHandler}) => {
    return (
        <button
            className="primary-button w-full disabled:bg-gray-400 disabled:text-gray-500"
            type="button"
            disabled={disabled}
            onClick={buttonHandler}
        >
            В корзину
        </button>
    );
};

export default ButtonCart;