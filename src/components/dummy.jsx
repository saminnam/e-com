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
import productStore from "../store/productsStore";
import cartStore from "../store/cartStore";
import ProductCart from "./ProductCart";

const Products = ({ productCart, setProductCart }) => {
  const { products, fetchProducts } = productStore();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");

  const { addToCart } = cartStore();

  // Load quantities from localStorage
  const [quantities, setQuantities] = useState(() => {
    const savedQuantities = localStorage.getItem("quantities");
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  // Load subtotals from localStorage
  const [subtotals, setSubtotals] = useState(() => {
    const savedSubtotals = localStorage.getItem("subtotals");
    return savedSubtotals ? JSON.parse(savedSubtotals) : {};
  });

  // Calculate total cart value based on subtotals
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  // Update subtotals whenever quantities change
  useEffect(() => {
    const newSubtotals = {};

    Object.keys(quantities).forEach((productId) => {
      newSubtotals[productId] = quantities[productId] * getProductPrice(productId);
    });

    setSubtotals(newSubtotals);
    localStorage.setItem("subtotals", JSON.stringify(newSubtotals));
  }, [quantities]);

  // Update cart total whenever subtotals change
  useEffect(() => {
    const totalAmount = Object.values(subtotals).reduce((acc, subTotal) => acc + subTotal, 0);
    setCartTotal(totalAmount);
  }, [subtotals]);

  // Handle quantity change
  const handleQuantityChange = (productId, data) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[productId] || 1) + data, 1);
      const newQuantities = { ...prev, [productId]: newQty };

      localStorage.setItem("quantities", JSON.stringify(newQuantities));
      return newQuantities;
    });
  };

  // Get product price
  const getProductPrice = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.price : 0;
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

  return (
    <Box className="relative min-h-screen">
      <FilterBox
        setValue={setSearchValue}
        selectCategory={setCategory}
        searchValue={searchValue}
        setView={setView}
      />
      <div>
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
            const quantity = quantities[product.id] || 1;
            const subTotal = subtotals[product.id] || 0;

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
                      onClick={() => handleQuantityChange(product.id, -1)}
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
                      onClick={() => handleQuantityChange(product.id, 1)}
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
      </div>

      {/* Show cart total */}
      <Box className="mt-4 p-4 bg-gray-100 text-center">
        <Text as="p" size="4" weight="bold">
          Total Cart Value: ₹{cartTotal}/-
        </Text>
      </Box>

      {loading && <Spinner loading={loading} size="3" />}
    </Box>
  );
};

export default Products;
