import zhCN from './zh-CN.json';

export type Locale = 'zh-CN' | 'ja-JP';

const translations: Record<Locale, any> = {
    'zh-CN': zhCN,
    'ja-JP': {}, // 占位符
};

/**
 * 极简 i18n 工具函数。
 * 获取指定路径的翻译字符串，支持简单的变量替换。
 */
export const t = (path: string, params?: Record<string, any>, locale: Locale = 'zh-CN'): string => {
    const keys = path.split('.');
    let result = translations[locale];

    for (const key of keys) {
        if (result && result[key]) {
            result = result[key];
        } else {
            return path; // 找不到时返回路径
        }
    }

    if (typeof result === 'string' && params) {
        return Object.entries(params).reduce(
            (acc, [key, val]) => acc.replace(`{{${key}}}`, String(val)),
            result
        );
    }

    return result;
};
