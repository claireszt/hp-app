import React, { useState, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import { supabase } from '../supabaseConfig.js';

import { ProgressBar } from 'react-native-paper';

function calculateChapterStats(chaptersData) {
  const totalChapters = chaptersData.length;
  const listenedChapters = chaptersData.filter((chapter) => chapter['listen-test'] !== null).length;
  const remainingChapters = totalChapters - listenedChapters;

  return {
    totalChapters,
    listenedChapters,
    remainingChapters,
  };
}

function calcPercent(chaptersData) {
  const totalChapters = chaptersData.length;
  const listenedChapters = chaptersData.filter((chapter) => chapter['listen-test'] !== null).length;
  const percentageListened = (listenedChapters / totalChapters);

  return percentageListened;
}

function ProgressBarComp({ currentBook, updateFlag, textType }) {
  const [allChapters, setAllChapters] = useState([]);

  useEffect(() => {
    async function fetchAllBookChapters() {
      const { data, error } = await supabase
        .from('history')
        .select('chapter, listen-test', { count: 'exact' })
        .order('chapter', { ascending: true })
        .filter('book', 'eq', currentBook.id);

      if (error) {
        console.error('Error fetching the currently listening book:', error);
      } else {
        setAllChapters(data);
      }
    }

    fetchAllBookChapters();
  }, [updateFlag]);



  const chapterStats = calculateChapterStats(allChapters);
  const percent = calcPercent(allChapters);

  let num = 0
  if (currentBook) { num = percent}

  return (
    <View>
      {allChapters ? (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <ProgressBar theme={{ colors: { surfaceVariant: '#DCDCDC' } }} animatedValue={num} color={currentBook.color} width={300} borderRadius={0}/>
          {textType == 'chapters' ? 
            chapterStats.remainingChapters == 1 ? <Text>last chapter</Text> : <Text>{chapterStats.remainingChapters} chapters remaining</Text>
          : (<Text>{(percent *100).toFixed(0)} %</Text>)
          }
          </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default ProgressBarComp;