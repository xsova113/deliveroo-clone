import React from "react";
import { Text, View, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../../../../sanity";
import { Link } from "expo-router";

const RestaurantCard = ({
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
}) => {
  return (
    <View className="bg-white mr-3 shadow mb-2 rounded-md">
      <Link
        href={{
          pathname: "restaurant",
          params: {
            id,
            imgUrl: imgUrl.asset._ref,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          },
        }}
      >
        <View>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="h-36 w-64 rounded-t-md"
          />

          <View className="px-3 pb-4">
            <Text className="font-bold text-lg pt-2">{title}</Text>

            <View className="flex-row items-center space-x-1">
              <StarIcon color={"green"} opacity={0.5} size={22} />
              <Text className="text-sm text-gray-500">
                <Text className="text-green-500">{rating}</Text> • {genre}
              </Text>
            </View>

            <View className="flex-row space-x-1">
              <MapPinIcon color={"gray"} opacity={0.4} size={22} />
              <Text className="text-sm text-gray-500">Nearby • {address}</Text>
            </View>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default RestaurantCard;
