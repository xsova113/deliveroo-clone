import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BasketScreen"
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="PreparingOrderScreen"
          options={{ headerShown: false, presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="DeliveryScreen"
          options={{ headerShown: false, presentation: "fullScreenModal" }}
        />
      </Stack>
    </Provider>
  );
}
