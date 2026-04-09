import { createContext, useContext, useEffect, useMemo, useState } from "react";

type TelegramContextType = {
    user: TelegramUser | null;
    theme: TelegramTheme | null;
    colorScheme: 'light' | 'dark';
    tg: TelegramWebApp | null;

    sendData: (data: unknown) => void;
    isTelegram: boolean;
};

const TelegramContext = createContext<TelegramContextType>({
    user: null,
    theme: null,
    colorScheme: "dark",
    tg: null,
    sendData: () => { },
    isTelegram: false
});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
    const [tg, setTg] = useState<TelegramWebApp | null>(null);
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [theme, setTheme] = useState<TelegramTheme | null>(null);
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const webApp = window.Telegram?.WebApp;
        if (!webApp) return;

        webApp.ready();
        webApp.expand();

        setTg(webApp);
        setUser(webApp.initDataUnsafe?.user || null);
        setTheme(webApp.themeParams || null);
        setColorScheme(webApp.colorScheme);

        const handleThemeChange = () => {
            setTheme(webApp.themeParams || null);
            setColorScheme(webApp.colorScheme);
        };

        webApp.onEvent("themeChanged", handleThemeChange);

        return () => {
            webApp.offEvent("themeChanged", handleThemeChange);
        };
    }, []);

    const sendData = (data: unknown) => {
        if (!tg) return console.warn("Telegram WebApp недоступен");

        tg.sendData(JSON.stringify(data));
    };

    const value = useMemo(
        () => ({
            tg,
            user,
            theme,
            colorScheme,
            sendData,
            isTelegram: !!tg
        }),
        [tg, user, theme, colorScheme]
    );

    return (
        <TelegramContext.Provider value={value}>
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);