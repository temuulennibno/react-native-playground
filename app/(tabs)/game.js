import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Tile = ({ color, audioPath, pressing = false, onClick }) => {
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    setIsPressing(pressing);
  }, [pressing]);

  const onPress = async () => {
    setIsPressing(true);
    const { sound } = await Audio.Sound.createAsync({
      uri: `https://www.musicca.com/lydfiler/piano/${audioPath}.mp3`,
    });
    await sound.playAsync();

    setTimeout(() => {
      setIsPressing(false);
    }, 300);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        width: "48%",
        height: "48%",
        backgroundColor: color,
        borderRadius: 10,
        opacity: isPressing ? 1 : 0.7,
      }}
    >
      <Text> </Text>
    </TouchableOpacity>
  );
};

export default function Game() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Tile color="#a4df66" audioPath={"58"} />
      <Tile color="#8b74d4" audioPath={"53"} />
      <Tile color="#3d5a80" audioPath={"55"} />
      <Tile color="#ffc7a2" audioPath={"56"} />
    </View>
  );
}
