import { useTelegram } from "../context/TelegramContext";

const THEMES = {
    dark: {
        bgColor: '#0f0f10',
        secondaryBgColor: '#1a1a1c',
        cardColor: '#1a1a1c',
        textColor: '#e5e7eb',
        hintColor: '#9ca3af',
        buttonColor: '#3f3f46',
        buttonTextColor: '#ffffff',
        linkColor: '#d4d4d8',
        borderColor: '#2a2a2e',
        glowColor: '#3f3f46',
    },
    light: {
        bgColor: '#f3f4f6',
        secondaryBgColor: '#ffffff',
        cardColor: '#ffffff',
        textColor: '#111827',
        hintColor: '#6b7280',
        buttonColor: '#e5e7eb',
        buttonTextColor: '#111827',
        linkColor: '#374151',
        borderColor: '#d1d5db',
        glowColor: '#d1d5db',
    }
};

export const useThemeColors = (overrideScheme?: 'light' | 'dark') => {
    const { colorScheme } = useTelegram();
    const scheme = overrideScheme || colorScheme;

    return THEMES[scheme] || THEMES.dark;
};