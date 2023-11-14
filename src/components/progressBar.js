import React, { useState, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import { supabase } from '../utils/supabaseConfig.js';

import { ProgressBar } from 'react-native-paper';

function calculateChapterStats(chaptersData) {
  const totalChapters = chaptersData ? chaptersData.length : 0;
  const lastChapt = chaptersData[totalChapters-1]
  const listenedChapters = (chaptersData ?? []).filter((chapter) => chapter['listen_count'] > lastChapt['listen_count']).length;
  const remainingChapters = totalChapters - listenedChapters;
  const percentageListened = (listenedChapters / totalChapters) * 100;

  return {
    totalChapters,
    listenedChapters,
    remainingChapters,
    percentageListened
  };
}

function ProgressBarComp({ currentBook, textType }) {
  const [allChapters, setAllChapters] = useState([]);

    async function fetchAllBookChapters() {
      const { data, error } = await supabase
        .from('history_new')
        .select('chapter, listen_count')
        .order('chapter', { ascending: true })
        .filter('book', 'eq', currentBook.id);

      if (error) {
        console.error('Error fetching the currently listening book:', error);
      } else {
        setAllChapters(data);
      }
    }

    fetchAllBookChapters();

  const chapterStats = calculateChapterStats(allChapters)

  const percent = allChapters ? chapterStats.percentageListened / 100 : 0;

  return (
    <View style={{ marginTop: 10, alignItems: 'center' }}>
    {allChapters ? (
        <View>
          <ProgressBar theme={{ colors: { surfaceVariant: '#DCDCDC' } }} animatedValue={percent} color={currentBook.color} width={300} borderRadius={0} />
          {textType == "chapters" ? (
            chapterStats.remainingChapters === 1 ? (
              <Text>last chapter</Text>
            ) : (
              <Text>{chapterStats.remainingChapters} chapters remaining</Text>
            )
          ) : (
            <Text>{Math.floor(chapterStats.percentageListened)} %</Text>
          )}
        </View>
      ) : null}
    </View>
  );
}

export default ProgressBarComp;