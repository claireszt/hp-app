import React from "react";
import { View, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Img from '../../utils/images.js'
import ProgressBar from '../../components/progressBar.js';

import CurrentStyle from './Style.js'

export function BookInfo({ currentBook, updateFlag }) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <Text style={CurrentStyle.title}>{currentBook.name}</Text>
        <Image source={Img[currentBook.img]} style={CurrentStyle.bookImg} />
        <ProgressBar currentBook={currentBook} updateFlag={updateFlag} />
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
              (<Icon.Button
                name="book"
                backgroundColor={currentBook.color}
                onPress={markChapterAsListened}
                borderRadius={50}
                size={20}
                padding={10}
                paddingLeft={20}
                paddingRight={20}
                >
                  NEXT BOOK
            </Icon.Button>)
            : (
              <Icon.Button
                name="headphones-alt"
                backgroundColor={currentBook.color}
                onPress={markChapterAsListened}
                borderRadius={50}
                size={20}
                padding={10}
                paddingLeft={20}
                paddingRight={20}
                >
                  LISTENED
            </Icon.Button>
            )
  
            }
  
        {nextBook ? null : <View style={{ width: 200 }}><Text style={{ color: '#A6A6B3', textAlign: 'center' }}>Next chapter:</Text>
        <Text style={{ color: '#A6A6B3', textAlign: 'center' }}>{nextChapter.title}</Text></View>}
      </View>
    );
  }