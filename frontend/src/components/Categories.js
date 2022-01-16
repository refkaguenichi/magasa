import React from "react";
import { Container } from "../common/CategoriesElements";
import { categories } from "./../constant/Constant";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
