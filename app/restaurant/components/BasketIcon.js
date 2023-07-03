import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../../redux/featured/basketSlice";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { useRouter } from "expo-router";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();

  if (items.length === 0) return null;

  return (
    <View className={`absolute bottom-10 z-50 w-full`}>
      <TouchableOpacity
        className="flex-row bg-[#00CCBB] mx-5 p-4 rounded-lg items-center justify-between space-x-1"
        onPress={() => router.push("/BasketScreen")}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          ${basketTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
