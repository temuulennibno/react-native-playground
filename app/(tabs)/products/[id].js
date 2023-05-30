import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Product() {
  const [product, setProduct] = useState(null);

  const { id } = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch("https://fakestoreapi.com/products/" + id)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, [id]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", zIndex: 1, top: 12, left: 12 }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "rgba(0,0,0,.5)",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>
            <Ionicons name="arrow-back" size={36} color={"white"} />
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={{ uri: product.image }}
        style={{ height: 400, width: "100%", marginBottom: 12 }}
      />
      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 28,
            marginBottom: 12,
            fontWeight: "bold",
            color: "#363636",
          }}
        >
          {product.title}
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginBottom: 12 }}>
          {product.description}
        </Text>
        <Text style={{ fontSize: 32 }}>
          <Ionicons name="star" size={32} color="#ffd700" />{" "}
          {product.rating.rate}{" "}
          <Text style={{ fontSize: 18, color: "#999" }}>
            ({product.rating.count} rating)
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
