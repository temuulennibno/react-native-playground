import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const ProductCard = ({ product }) => {
  return (
    <View style={{ borderWidth: 1, backgroundColor: "#fff", margin: 6 }}>
      <Image
        source={{ uri: product.image }}
        style={{ width: "100%", height: 200 }}
      />
      <View style={{ padding: 12, borderTopWidth: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: 24,
            height: 48,
            overflow: "hidden",
          }}
        >
          {product.title}
        </Text>
      </View>
    </View>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 24 }}>
        Recent Products
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          margin: -6,
        }}
      >
        {products.map((product) => (
          <TouchableOpacity
            onPress={() => router.push(`/products/${product.id}`)}
            key={product.id}
            style={{ width: "50%" }}
          >
            <ProductCard product={product} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
