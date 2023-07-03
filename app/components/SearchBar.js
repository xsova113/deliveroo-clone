import { Text, TextInput, View } from "react-native";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

const SearchBar = () => {
  return (
    <View className="flex-row items-center pb-2 space-x-2 mx-4">
      <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-md" >
        <MagnifyingGlassIcon color={"gray"} size={20} />
        <TextInput
          placeholder="Restaurants and cuisines"
          keyboardType="default"
        />
      </View>

      <AdjustmentsVerticalIcon color={"#00CCBB"} size={30} />
    </View>
  );
};

export default SearchBar;
