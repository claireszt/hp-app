import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { supabase } from '../supabaseConfig.js';

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

function ProgressBar({ currentBook, updateFlag }) {
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

  return (
    <View>
      {allChapters ? (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Progress.Bar progress={percent} width={300} color={currentBook.color} unfilledColor='#E0E0E0' borderWidth={0} />
          {chapterStats.remainingChapters == 1 ? <Text>last chapter</Text> : <Text>{chapterStats.remainingChapters} chapters remaining</Text>}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default ProgressBar;