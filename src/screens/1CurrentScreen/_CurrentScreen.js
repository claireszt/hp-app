import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import {
  newFetchCurrentData,
  newMarkChapterAsListened,
} from "../NEWDB/supabaseFunctions";

export const NewCurrentScreen = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false); // État intermédiaire pour forcer le rendu

  useEffect(() => {
    async function fetchData() {
      const { currentBook, currentChapter, nextChapter } = await newFetchCurrentData();
      setCurrentBook(currentBook);
      setCurrentChapter(currentChapter);
      setNextChapter(nextChapter);
    }

    fetchData();
    console.log(forceUpdate)
  }, [forceUpdate]);

  const isLoading = !(currentBook && currentChapter && nextChapter);

  const chaptBtn = async () => {
    try {
      await newMarkChapterAsListened(currentChapter.id);
      setForceUpdate(!forceUpdate); // Met à jour l'état intermédiaire pour forcer le rendu
      console.log('current screen updated');
    } catch (error) {
      console.error('Error marking chapter as listened:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={"black"} />
      ) : (
        <>
          <Text style={{ textAlign: "center" }}>{currentBook.name}</Text>
          <Text style={{ textAlign: "center", marginBottom: 10 }}>
            {currentChapter.id} : {currentChapter.title}
          </Text>
          <Button icon="headphones" mode="contained" onPress={chaptBtn}>
            Listened
          </Button>
        </>
      )}
    </View>
  );
};
