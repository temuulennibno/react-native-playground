import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const color = "#40c060";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: color }}>
      <Tabs.Screen
        name="products"
        options={{
          title: "Бүтээгдэхүүн",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="shirt-outline"
              size={24}
              color={focused ? color : "#363636"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Цэс",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="menu"
              size={24}
              color={focused ? color : "#363636"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
