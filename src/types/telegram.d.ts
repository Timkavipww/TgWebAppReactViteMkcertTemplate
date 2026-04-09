declare global {
    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
    }

    type TelegramUser = {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        is_premium?: boolean;
        photo_url?: string;
    };

    type TelegramTheme = {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
        secondary_bg_color?: string;

        /* расширенные цвета (которые ты уже видел) */
        accent_text_color?: string;
        destructive_text_color?: string;
        header_bg_color?: string;
        bottom_bar_bg_color?: string;
        section_bg_color?: string;
        section_header_text_color?: string;
        section_separator_color?: string;
        subtitle_text_color?: string;
    };

    type TelegramWebApp = {
        /* lifecycle */
        ready: () => void;
        expand: () => void;
        close: () => void;

        /* events */
        onEvent: (event: string, cb: () => void) => void;
        offEvent: (event: string, cb: () => void) => void;

        /* data */
        sendData: (data: string) => void;

        /* theme */
        setThemeParams: (params: TelegramTheme) => void;
        themeParams: TelegramTheme;
        colorScheme: 'light' | 'dark';

        /* init */
        initDataUnsafe?: {
            user?: TelegramUser;
        };
    };
}

export { };