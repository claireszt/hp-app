import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { fetchAllBooks, fetchBookChapters } from '../NEWDB/supabaseFunctions';

// ... Importations et autres codes ...

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);

  async function fetchBooks() {
    try {
      const fetchedBooks = await fetchAllBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Une erreur est survenue dans votre noble quête:', error);
      setError('Une erreur est survenue lors de la quête des livres. Veuillez réessayer plus tard.');
    }
  }

  const handleBookPress = async (book) => {
    try {
      const newExpandedBookId = expandedBookId === book.id ? null : book.id;
      setSelectedBook(book);
      setChapters(await fetchBookChapters(book.id));
      setExpandedBookId(newExpandedBookId);
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des chapitres:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Livres majestueux de la bibliothèque royale :</Text>
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}
        {!error && (
          <List.Section>
            {books.map((book) => (
              <List.Accordion
                key={book.id}
                title={book.name}
                style={styles.bookAccordion}
                expanded={expandedBookId === book.id}
                onPress={() => handleBookPress(book)}
              >
                {chapters.map((chapter) => (
                  <List.Item
                    key={chapter.id}
                    title={`Chapter ${chapter.num}: ${chapter.title}`}
                    description={chapter.summary}
                  />
                ))}
              </List.Accordion>
            ))}
          </List.Section>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookAccordion: {
    width: 400,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
  },
});
export default BooksScreen;
