import React from "react";
import { ScrollView, Text } from "react-native";
import Category from "./components/Category";
import Featured from "./components/Featured";
import { useState } from "react";
import { useEffect } from "react";
import client from "../../../sanity";

const Body = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    const query = `  
    *[_type == "featured"] {
      ...,
      restaurants[] ->{
        ...,
        dishes[] -> { ... }
      }
    }`;

    client.fetch(query).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <ScrollView
      className="bg-gray-100"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 250}}
    >
      <Category />

      {featuredCategories.map((category) => (
        <Featured
          id={category._id}
          title={category.name}
          description={category.short_description}
          key={category._id}
        />
      ))}
    </ScrollView>
  );
};

export default Body;
