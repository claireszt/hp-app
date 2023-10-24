import { supabase } from '../screens/0AUTH/supabase';

// FETCH
export async function fetchCurrentData() {
  const { data, error } = await supabase
    .from('history')
    .select('book(id, name, img, color), chapter(title, num, id)')
    .order('chapter', { ascending: true })
    .is('listen2023', null)
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

// UPDATE
export async function markChapterAsListened(chapterId) {
  if (chapterId) {
    const { updateError } = await supabase
      .from('history')
      .update({ 'listen2023': new Date() })
      .eq('chapter', chapterId);
    if (updateError) {
      console.error('Error updating the chapter:', updateError);
    }
  } else {
    console.error('Chapter ID is not valid.');
  }
}



