import { supabase } from '../screens/0AUTH/supabase';

// COLUMNS

const getListenColumns = async () => {
  const { data, error } = await supabase.rpc('get_columns', {
    tname: 'history',
  });

  if (error) {
    console.error('Error fetching column names:', error);
    return [];
  } else {
    const columnNames = data.map((item) => item.column_name);
    return columnNames;
  }
};

export const getLastListenColumn = async () => {
  const columns = await getListenColumns();
  if (columns.length > 0) {
    return columns[columns.length - 1];
  } else {
    return null;
  }
};

// FETCH
export async function fetchCurrentData() {
  const lastListenColumn = await getLastListenColumn();

  if (!lastListenColumn) {
    console.error('No listening column found.');
    return { currentBook: null, currentChapter: null, nextChapter: null };
  }

  const { data, error } = await supabase
    .from('history')
    .select('book(id, name, img, color), chapter(title, num, id)')
    .order('chapter', { ascending: true })
    .is(lastListenColumn, null)
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