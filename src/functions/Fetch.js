import { supabase } from '../screens/0AUTH/supabase';

export async function fetchCurrentData() {
  const { data, error } = await supabase
    .from('history')
    .select('book(id, name, img, color), chapter(title, num, id)')
    .order('chapter', { ascending: true })
    .is('listen-test', null)
    .limit(2);

  if (error) {
    console.error('Error fetching the currently listening book:', error);
    return { currentBook: null, currentChapter: null, nextChapter: null };
  }

  if (data.length > 0) {
    const currentBook = data[0].book;
    const currentChapter = data[0].chapter;
    const nextChapter = data[1].chapter;
    return { currentBook, currentChapter, nextChapter };
  }

  return { currentBook: null, currentChapter: null, nextChapter: null };
}

