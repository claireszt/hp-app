import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// CURRENT SCREEN
import { BookInfo, ChapterInfo } from './Components.js';

// STYLE
import CurrentStyle from './Style.js'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

// FUNCTIONS
import { fetchCurrentData, markChapterAsListened } from '../../utils/supabaseFunctions.js'; 
import CreateTableButton from '../../utils/currentListen.js';

function CurrentScreen() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { currentBook, currentChapter, nextChapter } = await fetchCurrentData();
      setCurrentBook(currentBook);
      setCurrentChapter(currentChapter);
      setNextChapter(nextChapter);
    }

    fetchData();
  }, [updateFlag]);

  const chaptBtn = async () => {
    if (currentChapter) {
      markChapterAsListened(currentChapter.id); 
      setUpdateFlag(!updateFlag)
    }
  }

  const isLoading = !(currentBook && currentChapter && nextChapter);

  return (
    <View style={CurrentStyle.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={'black'} />
      ) : (
        <>
          <BookInfo currentBook={currentBook} updateFlag={updateFlag} />
          <ChapterInfo
            currentChapter={currentChapter}
            nextChapter={nextChapter}
            markChapterAsListened={chaptBtn}
            currentBook={currentBook}
          />
        </>
      )}
    </View>
  );
}

export default CurrentScreen;
