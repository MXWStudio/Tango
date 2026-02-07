import { supabase } from '../lib/supabase';
import { Word } from '../types';

/**
 * Tango (单语) 数据服务。
 * 处理所有词汇和统计数据的远程读写逻辑。
 */
export const dataService = {
    /**
     * 获取所有词汇。
     */
    async getWords(): Promise<Word[]> {
        const { data, error } = await supabase
            .from('words')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching words:', error);
            return [];
        }

        return data.map(item => ({
            id: item.id,
            kanji: item.kanji,
            kana: item.kana,
            romaji: item.romaji,
            translation: item.translation,
            category: item.category,
            progress: item.progress,
            lastPracticed: item.last_practiced ? new Date(item.last_practiced) : undefined,
        }));
    },

    /**
     * 添加新单词。
     */
    async addWord(word: Omit<Word, 'id' | 'progress'>): Promise<Word | null> {
        const { data, error } = await supabase
            .from('words')
            .insert([
                {
                    kanji: word.kanji,
                    kana: word.kana,
                    romaji: word.romaji,
                    translation: word.translation,
                    category: word.category,
                    progress: 0,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error adding word:', error);
            return null;
        }

        return {
            id: data.id,
            kanji: data.kanji,
            kana: data.kana,
            romaji: data.romaji,
            translation: data.translation,
            category: data.category,
            progress: data.progress,
            lastPracticed: data.last_practiced ? new Date(data.last_practiced) : undefined,
        };
    },

    /**
     * 更新单词进度。
     */
    async updateProgress(id: string, progress: number): Promise<boolean> {
        const { error } = await supabase
            .from('words')
            .update({ progress, last_practiced: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error updating progress:', error);
            return false;
        }

        return true;
    },
};
