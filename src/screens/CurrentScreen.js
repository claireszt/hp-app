import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { supabase } from '../supabaseConfig.js';

import CurrentStyle from '../style/CurrentScreen.js'
import Img from '../utils/images.js'

import ProgressBar from '../components/progressBar.js';

function CurrentScreen() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {

    async function fetchCurrentInfo() {
      const { data, error } = await supabase
        .from('history')
        .select('book(id, name, img, color), chapter(title, num, id)')
        .order('chapter', { ascending: true })
        .is('listen-test', null)
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
          .update({ 'listen-test': new Date() })
          .eq('chapter', chapterId);
        if (updateError) {
          console.error('Error updating the chapter:', updateError);
        } else {
                    setUpdateFlag(false);
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
          <BookInfo
            currentBook={currentBook}
            updateFlag={updateFlag}
          />
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

function BookInfo({ currentBook, updateFlag }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 300 }}><Text style={CurrentStyle.title}>{currentBook.name}</Text></View>
      <Image source={Img[currentBook.img]} style={CurrentStyle.bookImg} />
      <ProgressBar currentBook={currentBook} updateFlag={updateFlag} />
    </View>
  );
}

function ChapterInfo({ currentChapter, nextChapter, markChapterAsListened, currentBook, nextBook }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25, gap: 10}}>
          <View style={{ width: 300 }}><Text style={{ fontSize: 20, textAlign: 'center' }}>Chapter {currentChapter.num}: {currentChapter.title}</Text></View>
          {nextBook ? 
            (<Icon.Button
              name="book"
              backgroundColor={currentBook.color}
              onPress={markChapterAsListened}
              borderRadius={50}
              size={20}
              padding={10}>
                NEXT BOOK
          </Icon.Button>)
          : (
            <Icon.Button
              name="headphones-alt"
              backgroundColor={currentBook.color}
              onPress={markChapterAsListened}
              borderRadius={50}
              size={20}
              padding={10}>
                LISTENED
          </Icon.Button>
          )

          }

      {nextBook ? null : <View style={{ width: 200 }}><Text style={{ color: '#A6A6B3', textAlign: 'center' }}>Next chapter:</Text>
      <Text style={{ color: '#A6A6B3', textAlign: 'center' }}>{nextChapter.title}</Text></View>}
    </View>
  );
}