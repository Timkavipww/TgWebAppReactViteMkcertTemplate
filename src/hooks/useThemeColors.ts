import { useTelegram } from "../context/TelegramContext";

const THEMES = {
    dark: {
        bgColor: '#0f0f10',
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

export const useThemeColors = () => {
    const { theme, colorScheme } = useTelegram();
    const base = THEMES[colorScheme] || THEMES.dark;

    const mix = (baseColor: string, tgColor?: string) => {
        if (!baseColor) return tgColor;

        return baseColor;
    };

    return {
        bgColor: mix(base.bgColor, theme?.bg_color),
        cardColor: base.cardColor,

        textColor: mix(base.textColor, theme?.text_color),
        hintColor: mix(base.hintColor, theme?.hint_color),

        buttonColor: mix(base.buttonColor, theme?.button_color),
        buttonTextColor: mix(base.buttonTextColor, theme?.button_text_color),

        linkColor: mix(base.linkColor, theme?.link_color),
        borderColor: base.borderColor,

        glowColor: base.glowColor,

        isDark: colorScheme === 'dark',
    };
};