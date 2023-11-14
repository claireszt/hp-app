import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { supabase } from '../utils/supabaseConfig.js';

export default function StartedComp({ currentBook }) {
  const [firstChapter, setFirstChapter] = useState([]);
  const [lastListenDate, setLastListenDate] = useState(null);

  useEffect(() => {
    async function fetchFirstChapters() {
      const { data, error } = await supabase
        .from('history_new')
        .select('chapter, listen_dates')
        .order('chapter', { ascending: true })
        .filter('book', 'eq', currentBook.id)
        .limit(1);

      if (error) {
        console.error('Error fetching the currently listening book:', error);
      } else {
        setFirstChapter(data);
        if (data.length > 0) {
          const lastDate = data[0].listen_dates[data[0].listen_dates.length - 1];
          const formattedDate = format(new Date(lastDate), 'MMMM d');
          setLastListenDate(formattedDate);
        }
      }
    }

    fetchFirstChapters();
  }, [currentBook.id]);

  return (
    <View style={{ marginBottom: 10 }}>
      {lastListenDate && (
        <Text>started on {lastListenDate}</Text>
      )}
    </View>
  );
}
