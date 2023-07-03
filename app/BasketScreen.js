import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../redux/featured/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../redux/featured/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const router = useRouter();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    // reduce function accumulate each item's id as a key in results object. Then push each item with same id into the results object and grouped them together based on id key as an array of each id key.
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={router.back}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color={"#00CCBB"} width={50} height={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-4 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50 - 75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white px-5 py-2"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="roundred-full w-20 h-14"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                ${items[0]?.price.toFixed(2)}
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">${basketTotal.toFixed(2)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">$5.99</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-black font-extrabold">Order Total</Text>
            <Text className="text-black font-extrabold">
              ${(basketTotal + 5.99).toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("PreparingOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
