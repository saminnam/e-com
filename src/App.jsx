import React, { useEffect, useState } from "react";
import filterToggle from "./store/filterToggle";
import theme from "./store/theme";
import "@radix-ui/themes/styles.css";
import {
  Theme,
  CheckboxGroup,
  Box,
  DropdownMenu,
  RadioGroup,
} from "@radix-ui/themes";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import "./App.css";
import ProductCart from "./components/ProductCart";
import cartStore from "./store/cartStore";

const App = () => {
  const [productCart, setProductCart] = useState(false);
  const { status } = filterToggle();
  const { themeStatus } = theme();
  const { getTotalSavedAmount } = cartStore();
  const [selectedValues, setSelectedValues] = useState(["night"]);
  const [range, setRange] = useState("0");

  const [cartTotalAmount, setCartTotalAmount] = useState(() => {
    const savedAmount = localStorage.getItem("cartTotalAmount");
    return savedAmount ? JSON.parse(savedAmount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cartTotalAmount", JSON.stringify(cartTotalAmount));
  }, [cartTotalAmount]);

  return (
    <>
      <Theme
        accentColor="blue"
        radius="rounded-none large"
        scaling="100%"
        appearance={themeStatus}
      >
        <Navbar productCart={productCart} setProductCart={setProductCart} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sticky top-0">
          <div
            className="filter-box p-5 sm:col-span-12 md:col-span-3 lg:col-span-2 md:block xs:hidden"
            style={{ display: status ? "block" : "none" }}
          >
            <Box maxWidth="600px" className="sticky top-24">
              <CheckboxGroup.Root defaultValue={["night"]} name="example">
                <CheckboxGroup.Item value="night">Night</CheckboxGroup.Item>
                <CheckboxGroup.Item value="kids">Kids</CheckboxGroup.Item>
                <CheckboxGroup.Item value="day">Day</CheckboxGroup.Item>
                <DropdownMenu.Separator />
                <CheckboxGroup.Item value="new">
                  New Collection
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="2025">
                  2025 Collections
                </CheckboxGroup.Item>
              </CheckboxGroup.Root>
              <DropdownMenu.Separator />
              <RadioGroup.Root
                name="example"
                onValueChange={(value) => setRange(value)}
              >
                <RadioGroup.Item value="200">Below 200</RadioGroup.Item>
                <RadioGroup.Item value="500">201 - 500</RadioGroup.Item>
                <RadioGroup.Item value="700">501 - 700</RadioGroup.Item>
                <RadioGroup.Item value="1000">701 - 1000</RadioGroup.Item>
                <RadioGroup.Item value="10000">1000 Above</RadioGroup.Item>
              </RadioGroup.Root>
            </Box>
          </div>
          <div className="sm:col-span-12 md:col-span-9 lg:col-span-10">
            <Products
              range={range}
              selectedValues={selectedValues}
              cartTotalAmount={cartTotalAmount}
              setCartTotalAmount={setCartTotalAmount}
            />
            <ProductCart
              productCart={productCart}
              setProductCart={setProductCart}
              cartTotalAmount={cartTotalAmount}
              setCartTotalAmount={setCartTotalAmount}
            />
          </div>
        </div>
        <div className="bg-black text-white p-3 lg:hidden xl:hidden md:hidden flex justify-between items-center fixed bottom-0 right-0 left-0">
          <button
            className="bg-blue-500 p-3 rounded cursor-pointer"
            onClick={() => setProductCart(true)}
          >
            View Cart
          </button>
          <p>You Saved: ₹ {getTotalSavedAmount()}</p>
          <p>Total Amount: ₹ {cartTotalAmount}</p>
        </div>
      </Theme>
    </>
  );
};

export default App;
