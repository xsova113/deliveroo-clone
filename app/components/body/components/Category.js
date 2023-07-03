import React from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import { useState } from "react";
import { useEffect } from "react";
import client, { urlFor } from "../../../../sanity";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "category"]
      `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {categories.map(category => (
        <CategoryCard key={category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.name} />
      ))}
    </ScrollView>
  );
};

export default Category;
