import React from 'react';

const ButtonCart = ({disabled, buttonHandler, children}) => {
    return (
      <button
        className="primary-button w-full disabled:text-gray-500 disabled:bg-gray-400"
        type="button"
        disabled={disabled}
        onClick={buttonHandler}
      >
        {children}
      </button>
    );
};

export default ButtonCart;