import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import {
  newFetchCurrentData,
  newMarkChapterAsListened,
} from "./supabaseFunctions";

import BookInfo from "./components";

export const NewCurrentScreen = ({ initialColor, onColorChange }) => {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [reRender, setReRender] = useState(0);

  async function fetchData() {
    const { currentBook, currentChapter, nextChapter } = await newFetchCurrentData();
    setCurrentBook(currentBook);
    setCurrentChapter(currentChapter);
    setNextChapter(nextChapter);

    // Update the color when data is fetched
    if (currentBook) {
      onColorChange(currentBook.color);
    }
  }

  useEffect(() => {
    fetchData();
    // console.log(currentChapter); // Log the updated currentChapter
  }, [reRender]);

  const chaptBtn = async () => {
    await newMarkChapterAsListened(currentChapter.id);
    setReRender((prev) => prev + 1);
  };

  const isLoading = !(currentBook && currentChapter && nextChapter);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={"black"} />
      ) : (
        <BookInfo
          currentBook={currentBook}
          currentChapter={currentChapter}
          nextChapter={nextChapter}
          chaptBtn={chaptBtn}
        />
      )}
    </View>
  );
};
