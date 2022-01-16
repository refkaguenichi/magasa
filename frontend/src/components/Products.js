import React from "react";
import { Container } from "../common/ProductsElements";
import { popularProducts } from "./../constant/Constant";
import Product from "./Product";

const Products = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
