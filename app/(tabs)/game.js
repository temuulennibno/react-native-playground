import { Audio } from "expo-av";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Tile = ({ color, audioPath, pressing = false, onClick }) => {
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (pressing) playNote();
  }, [pressing]);

  const playNote = async () => {
    setIsPressing(true);
    const { sound } = await Audio.Sound.createAsync({
      uri: `https://www.musicca.com/lydfiler/piano/${audioPath}.mp3`,
    });
    await sound.playAsync();
  };

  const onPress = async () => {
    await playNote();
    if (onClick) onClick();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsPressing(false);
    }, 1000);
  }, [isPressing]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        width: "48%",
        height: "48%",
        backgroundColor: color,
        borderRadius: 10,
        opacity: isPressing ? 1 : 0.5,
      }}
    >
      <Text> </Text>
    </TouchableOpacity>
  );
};

export default function Game() {
  const navigation = useNavigation();
  const [simon, setSimon] = useState([]);
  const [player, setPlayer] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingNote, setPlayingNote] = useState(undefined);
  const interval = useRef(null);

  const startGame = () => {
    const randomNumber = getRandomNumber(0, 3);
    setSimon([randomNumber]);
    setIsPlaying(true);
  };

  const checkPlayerClick = async () => {
    for (let i = 0; i < player.length; i++) {
      if (player[i] !== simon[i]) {
        alert("Game over!");
        const { sound } = await Audio.Sound.createAsync({
          uri: "https://www.myinstants.com/media/sounds/sadtrombone.swf.mp3",
        });
        await sound.playAsync();
        startGame();
        return;
      } else {
        if (i === simon.length - 1) {
          const { sound } = await Audio.Sound.createAsync({
            uri: "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Coin_Sound_Effect.mp3",
          });
          await sound.playAsync();
          setSimon([...simon, getRandomNumber(0, 3)]);
          setIsPlaying(true);
        }
      }
    }
  };

  const tileClick = (tileIndex) => {
    setPlayer([...player, tileIndex]);
    checkPlayerClick();
  };

  useEffect(() => {
    if (navigation.isFocused) {
      startGame();
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
      }, 1000);
    }
  }, [isPlaying]);

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
      <Tile
        color="#a4df66"
        audioPath={"58"}
        pressing={playingNote === 0}
        onClick={() => {
          tileClick(0);
        }}
      />
      <Tile
        color="#8b74d4"
        audioPath={"53"}
        pressing={playingNote === 1}
        onClick={() => {
          tileClick(1);
        }}
      />
      <Tile
        color="#3d5a80"
        audioPath={"55"}
        pressing={playingNote === 2}
        onClick={() => {
          tileClick(2);
        }}
      />
      <Tile
        color="#ffc7a2"
        audioPath={"56"}
        pressing={playingNote === 3}
        onClick={() => {
          tileClick(3);
        }}
      />
    </View>
  );
}
