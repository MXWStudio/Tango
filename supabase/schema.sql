-- Tango (单语) 数据库模式设计

-- 1. 创建词汇表 (Words Table)
CREATE TABLE IF NOT EXISTS public.words (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kanji TEXT NOT NULL,
    kana TEXT NOT NULL,
    romaji TEXT NOT NULL,
    translation TEXT NOT NULL,
    category TEXT NOT NULL,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    last_practiced TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. 创建用户统计表 (User Stats Table)
CREATE TABLE IF NOT EXISTS public.user_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    wpm NUMERIC DEFAULT 0,
    accuracy NUMERIC DEFAULT 0,
    total_time INTERVAL DEFAULT '00:00:00',
    words_mastered INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建成就表 (Achievements Table)
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    unlocked BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 4. 开启行级安全策略 (Enable Row Level Security)
ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- 5. 创建策略 (Policies) - 仅允许用户访问自己的数据
CREATE POLICY "Users can manage their own words" ON public.words
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own stats" ON public.user_stats
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own achievements" ON public.achievements
    FOR ALL USING (auth.uid() = user_id);
