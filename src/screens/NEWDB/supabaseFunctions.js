import { supabase } from "../../utils/supabaseConfig";

export async function newFetchCurrentData() {
  const { data, error } = await supabase
    .from("history_new")
    .select("listen_dates, book(id, name, img, color), chapter(title, num, id)")
    .order("listen_count", { ascending: true })
    .order("chapter", { ascending: true })
    .limit(2);

  if (error) {
    console.error("Error fetching the currently listening book:", error);
    return { currentBook: null, currentChapter: null, nextChapter: null, listenDates: null};
  }

  if (data.length > 0) {
    const currentBook = data[0].book;
    const currentChapter = data[0].chapter;
    const nextChapter = data[1].chapter;
    const listenDates = data[0].listen_dates;
    return { currentBook, currentChapter, nextChapter, listenDates };
  }

  return { currentBook: null, currentChapter: null, nextChapter: null, listenDates: null };
}

export async function newMarkChapterAsListened(chapterId) {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const { data: existingData, error: existingError } = await supabase
    .from('history_new')
    .select('listen_dates, listen_count')
    .eq('chapter', chapterId)
    .single();

  if (existingError) {
    console.error('Erreur lors de la récupération des données existantes :', existingError);
    return;
  }

  const existingListenDates = existingData.listen_dates || [];
  const existingListenCount = existingData.listen_count || 0;

  const newDates = existingListenDates.concat(formattedDate)
  const newCount = existingListenCount +1

  const { data, error } = await supabase
    .from('history_new')
    .update({
      listen_dates: newDates,
      listen_count: newCount
    })
    .eq('chapter', chapterId);

  if (error) {
    console.error('Erreur lors de la mise à jour des données :', error);
    return;
  } 
}

export async function fetchAllBooks() {
  const { data, error } = await supabase
  .from("books")
  .select("*")
  .order("id", { ascending: true });

if (error) {
  console.error("Error fetching the book list:", error);
  return null;
}

if (data.length > 0) {
  return data;
}

return null;
}

export async function fetchBookChapters(book) {
  const {data, error} = await supabase
  .from('chapters')
  .select()
  .eq('book', book)
  .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching the chapters: ', error);
    return null;
  } else {
    return data
  }
}