import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import DishRow from "./components/DishRow";
import {
  ArrowLeftIcon,
  StarIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import client, { urlFor } from "../../sanity";
import { useEffect } from "react";
import { useState } from "react";
import BasketIcon from "./components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../redux/featured/restaurantSlice";

const RestaurantScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    long,
    lat,
  } = useSearchParams();

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "restaurant" && _id == $id] {
          dishes[] -> ,type { name }
        }[0]
      `,
        { id }
      )
      .then((data) => setDishes(data.dishes))
      .finally(() =>
        dispatch(
          setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          })
        )
      )
      .catch((err) => console.warn(err.message));
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BasketIcon />
      <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
        <View className="relative">
          <Image
            source={{
              uri: imgUrl ? urlFor(imgUrl).url() : null,
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => router.back()}
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color={"green"} opacity={0.5} size={22} />
                <Text className={"text-xs text-gray-500"}>
                  <Text className="text-green-500">{rating}</Text> • {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color={"gray"} opacity={0.4} size={22} />
                <Text className={"text-xs text-gray-500"}>
                  Nearby • {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4 ">
              {short_description}
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a good allergy?
            </Text>
            <ChevronRightIcon color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View className="pb-28">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* dishes row  */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
