import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Card,
  TextField,
  Box,
  Grid,
  Spinner,
} from "@radix-ui/themes";
import FilterBox from "./FilterBox";
import cartStore from "../store/cartStore";
import productStore from "../store/productsStore";
import ProductCart from "./ProductCart";

const Products = ({ productCart, cartTotalAmount, setCartTotalAmount }) => {
  const { products, fetchProducts } = productStore();
  const { addToCart, updateQuantity } = cartStore();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");

  const { cart, savedAmounts, getTotalSavedAmount } = cartStore();

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  const handleIncrease = (product) => {
    addToCart(product);
  };

  const handleDecrease = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchValue
      ? product.title.toLowerCase().includes(searchValue.toLowerCase())
      : true;
    const matchesCategory = category
      ? String(product.cat_id) === String(category)
      : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setCartTotalAmount(total);
  }, [cart]);

  const cartLength = cart.length;
  console.log("Total unique items in cart:", cartLength);

  return (
    <Box className="relative min-h-screen">
      <FilterBox
        setValue={setSearchValue}
        selectCategory={setCategory}
        searchValue={searchValue}
        setView={setView}
      />
      {/* <Text as="p" size="3" className="total-saved">
        🏷 Total Saved: ₹{getTotalSavedAmount()}/-
      </Text> */}
      <Grid
        className={view === "grid" ? "grid-view" : "list-view"}
        columns={
          view === "grid"
            ? { initial: "2", sm: "3", md: "4", lg: "5", xl: "6" }
            : { initial: "1", sm: "1", md: "2", lg: "3" }
        }
        gap="3"
      >
        {filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          const subTotal = quantity * product.price;
          const savedAmount = savedAmounts[product.id] || 0;

          return (
            <Card key={product.id} className="product-card p-0">
              <img
                src={`https://myhitech.digitalmantraaz.com/` + product.photo}
                alt={product.title}
                style={{
                  objectFit: "cover",
                  height: view === "grid" ? "150px" : "100px",
                  width: view === "grid" ? "100%" : "100px",
                }}
              />
              <Box className={view === "grid" ? "" : "ms-2"}>
                <Text as="p" className="line-clamp-1" size="2" mt="2">
                  {product.title}
                </Text>
                <Flex className="mt-2">
                  <Text as="span" className="strike price">
                    MRP ₹{Math.ceil(product.price / 0.25)}/-
                  </Text>
                  <Text as="p" className="real price" size="2">
                    ₹{product.price}/-
                  </Text>
                  <Text as="p" className="sub-total" size="2">
                    ₹{subTotal}/-
                  </Text>
                </Flex>
                <Flex className="mt-3 control">
                  <Button
                    variant="soft"
                    color="red"
                    onClick={() => handleDecrease(product.id)}
                  >
                    -
                  </Button>
                  <TextField.Root
                    className="rounded-none"
                    value={quantity}
                    readOnly
                    style={{ width: "40px", textAlign: "center" }}
                  />
                  <Button
                    variant="soft"
                    color="green"
                    onClick={() => handleIncrease(product)}
                  >
                    +
                  </Button>
                </Flex>
              </Box>
            </Card>
          );
        })}
      </Grid>
      {productCart && <ProductCart />}
      {loading && <Spinner loading={loading} size="3" />}
    </Box>
  );
};

export default Products;
