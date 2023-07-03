import React from "react";
import { Image, Text, View } from "react-native";
import { ChevronDownIcon, UserIcon } from "react-native-heroicons/outline";

const Header = () => {
  return (
    <View className="flex-row pb-3 items-center space-x-2 mx-4">
      <Image
        source={{
          uri: "https://shorturl.at/iyOW9",
        }}
        className="w-10 h-10 bg-gray-200 p-4 rounded-full"
      />

      <View className="flex-1">
        <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
        <Text className="font-bold text-xl">
          Current Location
          <ChevronDownIcon size={20} color={"#00CCBB"} />
        </Text>
      </View>

      <UserIcon size={35} color={"#00CCBB"} />
    </View>
  );
};

export default Header;
