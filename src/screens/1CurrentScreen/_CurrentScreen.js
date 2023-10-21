import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// CURRENT SCREEN
import { BookInfo, ChapterInfo } from './Components.js';

// STYLE
import CurrentStyle from './Style.js'

// FUNCTIONS
import { fetchCurrentData } from '../../functions/Fetch.js'; 


function CurrentScreen() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { currentBook, currentChapter, nextChapter } = await fetchCurrentData();
      setCurrentBook(currentBook);
      setCurrentChapter(currentChapter);
      setNextChapter(nextChapter);
    }

    fetchData();
  }, [updateFlag]);

  const markChapterAsListened = async () => {
    if (currentChapter) {
      markChapterAsListened(currentChapter.id); 
      setUpdateFlag(false);
      setUpdateFlag(true);
    }
  }

  const isLoading = !(currentBook && currentChapter && nextChapter);

  return (
    <View style={CurrentStyle.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <BookInfo currentBook={currentBook} updateFlag={updateFlag} />
          <ChapterInfo
            currentChapter={currentChapter}
            nextChapter={nextChapter}
            markChapterAsListened={markChapterAsListened}
            currentBook={currentBook}
          />
        </>
      )}
    </View>
  );
}

export default CurrentScreen;
