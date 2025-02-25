import React, { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import cartStore from "../store/cartStore";
import { Card } from "react-bootstrap";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { BsCartX } from "react-icons/bs";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const ProductCart = ({ productCart, setProductCart, cartTotalAmount }) => {
  const { getTotalSavedAmount, cart, updateQuantity } = cartStore();

  const handleIncrease = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  const handleDecrease = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  return (
    <div
      className={`fixed z-50 top-16 cursor-pointer right-0 lg:w-[400px] w-full h-screen bg-white shadow-lg transition-all duration-300 ${
        productCart ? "right-0" : "right-[-100%]"
      }`}
    >
      <div className="relative py-5 px-4">
        <div className=" flex justify-between items-center border-b pb-1">
          <h2 className="text-lg font-semibold text-black font-serif">
            🛒 Shopping Cart
          </h2>
          <FaRegWindowClose
            className="text-xl font-bold text-black"
            onClick={() => setProductCart(false)}
          />
        </div>
        <div className="flex flex-col gap-3 py-3">
          {cart.length === 0 ? (
            <div className="text-6xl flex justify-center h-[75vh] items-center text-gray-500">
              <BsCartX />
            </div>
          ) : (
            cart.map((product) => (
              <Card key={product.id} className="cart-item">
                <Flex className="cart-details">
                  <img
                    src={
                      `https://myhitech.digitalmantraaz.com/` + product.photo
                    }
                    alt={product.title}
                    style={{
                      width: "80px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                  <Flex className="ms-3" direction={"column"} gap={"1"}>
                    <Text as="p" className="text-gray-500">
                      {product.title}
                    </Text>
                    <Text as="p" className="text-gray-500">
                      ₹{product.price} x {product.quantity}
                    </Text>
                    <Flex align={"center"}>
                      <Button
                        variant="soft"
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleDecrease(product.id)}
                      >
                        <FaMinus className="cursor-pointer" />
                      </Button>
                      <Text as="span" mx="2" className="text-gray-500">
                        {product.quantity}
                      </Text>
                      <Button
                        variant="soft"
                        color="green"
                        className="cursor-pointer"
                        onClick={() => handleIncrease(product.id)}
                      >
                        <FaPlus className="cursor-pointer" />
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))
          )}
        </div>
        <Text
          as="div"
          className="absolute lg:top-[520px] border border-black bg-black rounded p-3 w-full lg:w-[368px] xl: lg:block hidden xl:block md:block"
        >
          <div className="flex items-center justify-between">
            <p>You Saved: ₹ {getTotalSavedAmount()}</p>
            <p>Total Amount: ₹ {cartTotalAmount}</p>
          </div>
        </Text>
      </div>
    </div>
  );
};

export default ProductCart;
