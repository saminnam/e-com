// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   Flex,
//   Text,
//   Card,
//   TextField,
//   Tabs,
//   Box,
//   Grid,
//   Spinner,
// } from "@radix-ui/themes";
// import FilterBox from "./FilterBox";
// import Categories from "./Categories";
// import { CiBoxList, CiGrid41 } from "react-icons/ci";
// import productStore from "../store/productsStore";
// import cartStore from "../store/cartStore";
// import ProductCart from "./ProductCart";

// const Products = ({ productCart, setProductCart }) => {
//   // const [products, setProducts] = useState([]);
//   const { products, fetchProducts } = productStore();
//   const [searchValue, setSearchValue] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [view, setView] = useState("list");

//   const { addToCart } = cartStore();

//   // Fetch products
//   useEffect(() => {
//     console.log(view);

//     setLoading(true);
//     fetchProducts();
//     setLoading(false);
//   }, []);

//   // Filter products
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = searchValue
//       ? product.title.toLowerCase().includes(searchValue.toLowerCase())
//       : true;
//     const matchesCategory = category
//       ? String(product.cat_id) === String(category)
//       : true;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <Box className="relative min-h-screen">
//       {/* Product Container with dynamic classes */}
//       <FilterBox
//         setValue={setSearchValue}
//         selectCategory={setCategory}
//         searchValue={searchValue}
//         setView={setView}
//       />
//       <div>
//         <Grid
//           className={view === "grid" ? "grid-view" : "list-view"}
//           columns={
//             view === "grid"
//               ? { initial: "2", sm: "3", md: "4", lg: "5", xl: "6" }
//               : { initial: "1", sm: "1", md: "2", lg: "3" }
//           }
//           gap="3"
//         >
//           {filteredProducts.map((product, index) => (
//             <Card key={index} className="product-card p-0">
//               <img
//                 src={`https://myhitech.digitalmantraaz.com/` + product.photo}
//                 alt={product.title}
//                 style={{
//                   objectFit: "cover",
//                   height: view === "grid" ? "150px" : "100px",
//                   width: view === "grid" ? "100%" : "100px",
//                 }}
//               />
//               <Box className={view === "grid" ? "" : "ms-2"}>
//                 <Text as="p" className="line-clamp-1" size="2" mt="2">
//                   {product.title}
//                 </Text>
//                 <Flex className="mt-2">
//                   <Text as="span" className="strike price">
//                     MRP ₹{Math.ceil(product.price / 0.25)}/-
//                   </Text>
//                   <Text as="p" className="real price" size="2">
//                     ₹{product.price}/-
//                   </Text>
//                   <Text as="p" className="sub-total" size="2">
//                     ₹{0}/-
//                   </Text>
//                 </Flex>
//                 <Flex className="mt-3 control">
//                   <Button variant="soft" color="red">
//                     -
//                   </Button>
//                   <TextField.Root
//                     className="rounded-none"
//                     defaultValue={1}
//                     style={{ width: "40px" }}
//                   />
//                   <Button variant="soft" color="green">
//                     +
//                   </Button>
//                 </Flex>
//               </Box>
//             </Card>
//           ))}
//         </Grid>
//         {productCart && <ProductCart />}
//       </div>
//       {loading && <Spinner loading={loading} size="3" />}
//     </Box>
//   );
// };

// export default Products;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Text,
  Card,
  TextField,
  Tabs,
  Box,
  Grid,
  Spinner,
} from "@radix-ui/themes";
import FilterBox from "./FilterBox";
import Categories from "./Categories";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
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

  // State to track product quantities
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId, data) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[productId] || 1) + data, 1);
      const newQuantities = { ...prev, [productId]: newQty };
      return newQuantities;
    });
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
            const subTotal = quantity * product.price;

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
      {loading && <Spinner loading={loading} size="3" />}
    </Box>
  );
};

export default Products;
