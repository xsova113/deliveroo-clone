import { View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Body from "./components/body/Body";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <View>
        <Header />
        <SearchBar />
        <Body />
      </View>
    </SafeAreaView>
  );
}
