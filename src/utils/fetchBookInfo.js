import { supabase } from '../supabaseConfig.js';

async function fetchInfo() {
  const { data, error } = await supabase
    .from('history')
    .select('book(name, img, color), chapter(title, num, id)')
    .order('chapter', { ascending: true })
    .is('listen2023', null)
    .limit(2);

  if (error) {
    console.error('Error fetching the currently listening book:', error);
    return null; // Gestion de l'erreur, retourne null ou une valeur par défaut
  } else if (data.length > 0) {
    const currentBook = data[0].book;
    const currentChapter = data[0].chapter;
    const nextChapter = data[1].chapter;

    return { currentBook, currentChapter, nextChapter };
  } else {
    return null; // Gestion du cas où il n'y a pas de données
  }
}

