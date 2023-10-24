import React, { useState, useEffect } from "react";
import { View, Text, Button } from 'react-native';

export function BookList() {
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
        {bookData.map((book) => (
          <View key={book.id}> 
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>{book.name}</Text>
          </View>
        ))}
      </View>
    )
}