import React from "react";
import { Text, Image, View } from "react-native";
import { Button, Card } from "react-native-paper";

import Img from "../../utils/images.js";
import ProgressBarComp from "../../components/progressBar.js";
import StartedComp from "../../components/started.js";

export default function BookInfo({
  currentBook,
  currentChapter,
  nextChapter,
  chaptBtn,
}) {
  // Fonction pour ajouter 10% d'opacité à la couleur
  const addOpacity = (color, opacity) => {
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const cardBackgroundColor = addOpacity(currentBook.color, 0.2);

  const nextBook = nextChapter ? nextChapter.num === 1 : false;

  return (
    <>
      <Image
        source={Img[currentBook.img]}
        style={{ width: 300, height: undefined, aspectRatio: 568 / 873 }}
      />
      <StartedComp currentBook={currentBook} />
      <ProgressBarComp currentBook={currentBook} textType="chapters" />

      <Card
        mode="contained"
        style={{ marginTop: 10, backgroundColor: cardBackgroundColor, borderRadius: 0 }}
      >
        <Card.Content
          style={{
            width: 300,
            alignItems: "center",
          }}
        >
          <Text variant="bodyMedium">chapter {currentChapter.num}</Text>
          <Text variant="titleLarge">{currentChapter.title}</Text>
        </Card.Content>
      </Card>
      {nextBook ? (
        <View>
          <Button
            icon="book"
            mode="contained"
            onPress={chaptBtn}
            uppercase={true}
            theme={{ colors: { primary: currentBook.color } }}
            style={{ marginTop: 10, borderRadius: 0 }}
          >
            NEXT BOOK
          </Button>
        </View>
      ) : (
        <>
          <Text
            style={{ textAlign: "center", color: "#A6A6B3", marginBottom: 10, width: 300 }}
          >
            next chapter: {nextChapter.title}
          </Text>
          <Button
            icon="headphones"
            mode="contained"
            onPress={chaptBtn}
            uppercase={true}
            theme={{ colors: { primary: currentBook.color } }}
            style={{ borderRadius: 0 }}
          >
            LISTENED
          </Button>
        </>
      )}
    </>
  );
}
