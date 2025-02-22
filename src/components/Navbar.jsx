import React, { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { Switch } from "radix-ui";
import { BsCart } from "react-icons/bs";
import theme from "../store/theme";
import ProductCart from "./ProductCart";

const Navbar = ({ productCart, setProductCart }) => {
  const { toggleTheme } = theme();

  return (
    <>
      <div
        className="flex justify-between p-5 sticky top-0 w-full z-10"
        style={{ background: "rgb(0 144 255)" }}
      >
        <div className="logo">
          {/* <img src="" alt="" /> */}
          <h2>Flipkart</h2>
        </div>
        <div>
          <Flex gap={"2"} align="center">
            <button
              onClick={() => setProductCart(true)}
              className="bg-blue-500 cursor-pointer text-white text-xl px-4 py-2 rounded"
            >
              <BsCart />
            </button>
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
