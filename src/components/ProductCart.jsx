import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

const ProductCart = ({
  productCart,
  setProductCart,
}) => {
  return (
    <div
      className={`fixed z-50 top-20 cursor-pointer right-0 lg:w-[400px] w-full h-full bg-white shadow-lg transition-all duration-300 ${
        productCart ? "right-0" : "right-[-100%]"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold text-black font-serif">
          Shopping Cart
        </h2>
        <FaRegWindowClose
          className="text-xl font-bold text-black"
          onClick={() => setProductCart(false)}
        />
      </div>
      <div className="p-4">Your cart items go here...</div>
    </div>
  );
};

export default ProductCart;
