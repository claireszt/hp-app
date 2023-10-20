// BooksScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import { supabase } from '../supabaseConfig.js';

const BooksScreen = () => {
  const [bookData, setBookData] = useState([]);

    useEffect(() => {
      // Obtenir les données de la table "books" depuis Supabase
      async function fetchBookData() {
        const { data, error } = await supabase
          .from('books')
          .select();

        if (error) {
          console.error('Error fetching book data:', error);
        } else {
          setBookData(data);
        }
      }
      fetchBookData();
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={bookData}
          keyExtractor={(item) => item.id.toString()} // Assurez-vous d'ajuster cette clé en fonction de votre structure de données
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              {/* Ajoutez ici l'affichage d'autres propriétés de l'élément, si nécessaire */}
            </View>
          )}
        />
      </View>
    );
}

export default BooksScreen;
