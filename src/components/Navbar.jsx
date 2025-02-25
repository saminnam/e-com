import React, { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { Switch } from "radix-ui";
import { BsCart } from "react-icons/bs";
import theme from "../store/theme";
import ProductCart from "./ProductCart";
import cartStore from "../store/cartStore";

const Navbar = ({ productCart, setProductCart }) => {
  const { toggleTheme } = theme();
  const { cart } = cartStore();
  const cartLength = cart.length;

  return (
    <>
      <div
        className="flex justify-between items-center p-5 sticky top-0 w-full z-10"
        style={{ background: "rgb(0 144 255)" }}
      >
        <div className="logo">
          {/* <img src="" alt="" /> */}
          <h2 className="font-bold text-lg">Flipkart</h2>
        </div>
        <div>
          <Flex gap={"7"} align="center">
            <div className="relative">
              <button
                onClick={() => setProductCart(true)}
                className="bg-blue-500 cursor-pointer text-white text-xl px-4 py-2 rounded"
              >
                <BsCart />
              </button>
              <p className="bg-green-500 px-1.5 border text-sm border-white absolute -top-3 -right-2 text-center rounded-full text-white">{cartLength}</p>
            </div>
            <Switch.Root className="SwitchRoot" onCheckedChange={toggleTheme}>
              <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
          </Flex>
        </div>
      </div>
      {productCart && <ProductCart />}
    </>
  );
};

export default Navbar;
