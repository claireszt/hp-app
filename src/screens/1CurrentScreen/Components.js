import React from "react";
import { View, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';

import Img from '../../utils/images.js'
import ProgressBarComp from '../../components/progressBar.js';

import CurrentStyle from './Style.js'

export function BookInfo({ currentBook, updateFlag }) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <Text style={CurrentStyle.title}>{currentBook.name}</Text>
        <Image source={Img[currentBook.img]} style={CurrentStyle.bookImg} />
        <ProgressBarComp currentBook={currentBook} updateFlag={updateFlag} textType='chapters' />
      </View>
    );
  }

export function ChapterInfo({ currentChapter, nextChapter, markChapterAsListened, currentBook }) {
    let nextBook;
    if (nextChapter) {
      nextBook = nextChapter.num === 1;
    }
  
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25, gap: 10}}>
            <View style={{ width: 300 }}><Text style={{ fontSize: 20, textAlign: 'center' }}>Chapter {currentChapter.num}: {currentChapter.title}</Text></View>
            {nextBook ? 
              (<Button
                icon="book"
                mode="contained"
                onPress={markChapterAsListened}
                textColor='white'
                uppercase={true}
                theme={{ colors: { primary:currentBook.color, outline: currentBook.color } }}
              >
                  NEXT BOOK
            </Button>)
            : ( 
              <Button
                icon="headphones"
                mode="outlined"
                onPress={markChapterAsListened}
                textColor={currentBook.color}
                uppercase={true}
                theme={{ colors: { outline: currentBook.color } }}
              >
                LISTENED
              </Button>
            )
  
            }
  
        {nextBook ? null : <View style={{ width: 200 }}><Text style={{ color: '#A6A6B3', textAlign: 'center' }}>Next chapter:</Text>
        <Text style={{ color: '#A6A6B3', textAlign: 'center' }}>{nextChapter.title}</Text></View>}
      </View>
    );
  }