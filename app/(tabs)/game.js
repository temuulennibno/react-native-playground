import { Audio } from "expo-av";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Tile = ({ color, audioPath, pressing = false, onClick }) => {
  useEffect(() => {
    if (pressing) onPress();
  }, [pressing]);

  const onPress = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: `https://www.musicca.com/lydfiler/piano/${audioPath}.mp3`,
    });
    await sound.playAsync();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        width: "48%",
        height: "48%",
        backgroundColor: color,
        borderRadius: 10,
      }}
    >
      <Text> </Text>
    </TouchableOpacity>
  );
};

export default function Game() {
  const navigation = useNavigation();
  const [simon, setSimon] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingNote, setPlayingNote] = useState(undefined);
  const interval = useRef(null);

  useEffect(() => {
    if (navigation.isFocused) {
      const randomNumber = getRandomNumber(0, 3);
      setSimon([randomNumber]);
      setIsPlaying(true);
    }
  }, [navigation]);

  useEffect(() => {
    if (isPlaying) {
      let i = 0;
      interval.current = setInterval(() => {
        if (simon.length === i) {
          setIsPlaying(false);
          clearInterval(interval.current);
        } else {
          setPlayingNote(simon[i]);
          i++;
        }
      }, 300);
    }
  }, [isPlaying]);

  useEffect(() => {
    console.log("playingNote: " + playingNote);
  }, [playingNote]);

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
      <Tile color="#a4df66" audioPath={"58"} pressing={playingNote === 0} />
      <Tile color="#8b74d4" audioPath={"53"} pressing={playingNote === 1} />
      <Tile color="#3d5a80" audioPath={"55"} pressing={playingNote === 2} />
      <Tile color="#ffc7a2" audioPath={"56"} pressing={playingNote === 3} />
    </View>
  );
}
