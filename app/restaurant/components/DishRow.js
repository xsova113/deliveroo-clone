import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { urlFor } from "../../../sanity";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketitemsWithId,
} from "../../../redux/featured/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketitemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length < 1) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        className={`border-t border-gray-200 p-4 bg-white`}
        onPress={() => setIsPressed((prev) => !prev)}
      >
        <View className="flex-row gap-3">
          <View className="flex-1 space-y-2">
            <Text className="text-lg">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400">${price}</Text>
          </View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-20 h-20 bg-gray-200 p-4 rounded-md"
            style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="flex-row pt-2 items-center bg-white space-x-2 px-4 pb-3">
          <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
            <MinusCircleIcon
              color={items.length > 0 ? "#00CCBB" : "gray"}
              size={40}
            />
          </TouchableOpacity>
          <Text>{items.length}</Text>
          <TouchableOpacity onPress={addItemToBasket}>
            <PlusCircleIcon color={"#00CCBB"} size={40} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;
