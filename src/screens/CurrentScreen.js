import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, Pressable } from 'react-native';

import { supabase } from '../supabaseConfig.js';

import CurrentStyle from '../style/CurrentScreen.js'
import Img from '../utils/images.js'

function CurrentScreen() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    // Obtenir le livre actuellement écouté depuis Supabase
    async function fetchCurrentInfo() {
      const { data, error } = await supabase
        .from('history')
        .select('book(name, img, color), chapter(title, num, id)')
        .order('chapter', { ascending: true })
        .is('listen2023', null)
        .limit(2);
      if (error) {
        console.error('Error fetching the currently listening book:', error);
      } else if (data.length > 0) {
        setCurrentBook(data[0].book);
        setCurrentChapter(data[0].chapter);
        setNextChapter(data[1].chapter);
      }
    }
    fetchCurrentInfo();
  }, [updateFlag]);

  const markChapterAsListened = async () => {
    if (currentChapter) {
      const chapterId = currentChapter.id;
      // Assurez-vous que chapterId est correctement défini avant de poursuivre
      if (chapterId) {
        const { updateError } = await supabase
          .from('history')
          .update({ listen2023: new Date() })
          .eq('chapter', chapterId);
        if (updateError) {
          console.error('Error updating the chapter:', updateError);
        } else {
                    // Réinitialisez le drapeau de mise à jour à false pour permettre de futurs re-renders
                    setUpdateFlag(false);
                    // Forcez un re-render en mettant le drapeau à true
                    setUpdateFlag(true);
                  }
      } else {
        console.error('Chapter ID is not valid.');
      }
    }
  };

    const isLoading = !(currentBook && currentChapter && nextChapter)

    let nextBook
    if (nextChapter) {
      nextBook = nextChapter.num === 1    
    }

  return (
    <View style={CurrentStyle.container}>
      {isLoading ? ( // Afficher la page de chargement tant que les données ne sont pas prêtes
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <BookInfo currentBook={currentBook} />
          <ChapterInfo
            currentChapter={currentChapter}
            nextChapter={nextChapter}
            markChapterAsListened={markChapterAsListened}
            currentBook={currentBook}
            nextBook={nextBook}
          />
        </>
      )}
    </View>
  );
}

export default CurrentScreen;

function BookInfo({ currentBook }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={CurrentStyle.title}>{currentBook.name}</Text>
            <Image source={Img[currentBook.img]} style={CurrentStyle.bookImg} />
    </View>
  );
}

function ChapterInfo({ currentChapter, nextChapter, markChapterAsListened, currentBook, nextBook }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50, gap: 10}}>
          <Text style={{ fontSize: 20 }}>Chapter {currentChapter.num}: {currentChapter.title}</Text>
          <Button
        color={currentBook.color}
        title={nextBook ? 'Next Book' : 'Listened'}
        onPress={markChapterAsListened}
      />
      {nextBook ? null : <Text style={{ color: '#A6A6B3' }}>Next chapter: {nextChapter.title}</Text>}
    </View>
  );
}