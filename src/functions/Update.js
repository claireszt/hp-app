import { supabase } from '../screens/0AUTH/supabase';

export async function markChapterAsListened(chapterId) {
  if (chapterId) {
    const { updateError } = await supabase
      .from('history')
      .update({ 'listen-test': new Date() })
      .eq('chapter', chapterId);
    if (updateError) {
      console.error('Error updating the chapter:', updateError);
    }
  } else {
    console.error('Chapter ID is not valid.');
  }
}
