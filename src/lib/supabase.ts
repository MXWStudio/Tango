import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Tango (单语) Supabase 客户端单例。
 * 用于处理所有与数据库相关的交互，包括词汇同步、统计数据上传等。
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
