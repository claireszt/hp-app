// BooksScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { Avatar, Button, Card, Text, Divider } from 'react-native-paper';

import Img from '../../utils/images.js'
import ProgressBarComp from '../../components/progressBar.js';

import { supabase } from '../../supabaseConfig.js';

const BooksScreen = () => {
  const [bookData, setBookData] = useState([]);

    useEffect(() => {
      // Obtenir les données de la table "books" depuis Supabase
      async function fetchBookData() {
        const { data, error } = await supabase
          .from('books')
          .select()
          .order('id', { ascending: true })
          ;

        if (error) {
          console.error('Error fetching book data:', error);
        } else {
          setBookData(data);
        }
      }
      fetchBookData();
    }, []);

    return (
      <View style={{ flex: 1, marginTop: 50, justifyContent: 'center' }}>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        {bookData.map((book) => (
          <View key={book.id}> 
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>{book.name}</Text>
            <ProgressBarComp currentBook={book} textType={'percent'} />
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          </View>
        ))}
      </View>
    );
}

export default BooksScreen;
