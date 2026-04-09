import { createContext, useContext, useEffect, useState } from "react";

type TelegramUser = {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    is_premium?: boolean;
    language_code?: string;
    photo_url?: string;
};

type TelegramTheme = {
    bg_color?: string;
    text_color?: string;
    button_color?: string;
    button_text_color?: string;
    link_color?: string;
    hint_color?: string;
};

type TelegramContextType = {
    user: TelegramUser | null;
    theme: TelegramTheme | null;
    colorScheme: 'light' | 'dark';
};

const TelegramContext = createContext<TelegramContextType>({
    user: null,
    theme: null,
    colorScheme: 'dark', // 👈 фикс
});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [theme, setTheme] = useState<TelegramTheme | null>(null);
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.ready();

        // 👇 первичная инициализация
        setUser(tg.initDataUnsafe?.user || null);
        setTheme(tg.themeParams || null);
        setColorScheme(tg.colorScheme || 'dark');

        // 👇 реакция на смену темы
        const handleThemeChange = () => {
            setTheme(tg.themeParams || null);
            setColorScheme(tg.colorScheme || 'dark');
        };

        tg.onEvent?.('themeChanged', handleThemeChange);

        return () => {
            tg.offEvent?.('themeChanged', handleThemeChange);
        };
    }, []);

    return (
        <TelegramContext.Provider value={{ user, theme, colorScheme }}>
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);