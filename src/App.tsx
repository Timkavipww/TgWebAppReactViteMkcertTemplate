import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "./context/TelegramContext";
import { useThemeColors } from "./hooks/useThemeColors";

export default function App() {
  const { user, colorScheme } = useTelegram();
  const navigate = useNavigate();

  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>(colorScheme);
  const [openColor, setOpenColor] = useState<string | null>(null);
  const [tgTheme, setTgTheme] = useState<Record<string, string> | null>(null);

  const theme = useThemeColors(previewTheme);

  // Обновляем previewTheme и themeParams
  useEffect(() => {
    setPreviewTheme(colorScheme);
    setTgTheme(window.Telegram?.WebApp?.themeParams || null);

    const handleThemeChange = () => {
      setTgTheme(window.Telegram?.WebApp?.themeParams || null);
      setPreviewTheme(window.Telegram?.WebApp?.colorScheme || 'dark');
    };

    window.Telegram?.WebApp?.onEvent?.("themeChanged", handleThemeChange);
    return () => {
      window.Telegram?.WebApp?.offEvent?.("themeChanged", handleThemeChange);
    };
  }, [colorScheme]);

  const toggleTheme = () => {
    setPreviewTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // описание каждого цвета
  const colorDescriptions: Record<string, string> = {
    bgColor: "Фоновый цвет всей страницы.",
    secondaryBg: "Вторичный фон, используется для секций.",
    cardColor: "Цвет карточек и панелей.",
    textColor: "Основной цвет текста.",
    hintColor: "Цвет подсказок, вспомогательного текста.",
    buttonColor: "Фон кнопок.",
    buttonTextColor: "Цвет текста на кнопках.",
    linkColor: "Цвет ссылок.",
    borderColor: "Цвет рамок и границ.",
    glowColor: "Цвет теней и свечения.",
  };

  return (
    <div
      style={{ backgroundColor: theme.bgColor, color: theme.textColor }}
      className="min-h-screen p-4 flex flex-col items-center gap-6"
    >
      {/* Профиль */}
      <div
        style={{ backgroundColor: theme.cardColor, borderColor: theme.borderColor }}
        className="relative max-w-md w-full p-6 rounded-2xl shadow-2xl border"
      >
        <h2 className="text-lg font-bold mb-4">Профиль Telegram</h2>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.photo_url}
            alt="avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg"
          />
          <div className="flex flex-col">
            <span style={{ color: theme.hintColor }}><b>Username:</b> @{user?.username}</span>
            <span style={{ color: theme.hintColor }}><b>ID:</b> {user?.id}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/data')}
            style={{ backgroundColor: theme.buttonColor, color: theme.buttonTextColor }}
            className="px-4 py-2 rounded-lg font-semibold"
          >
            Перейти на Data
          </button>

          <button
            onClick={toggleTheme}
            style={{ backgroundColor: theme.buttonColor, color: theme.buttonTextColor }}
            className="px-4 py-2 rounded-lg font-semibold"
          >
            Сменить тему
          </button>
        </div>
      </div>

      {/* Цветовая палитра с слайдером */}
      <div
        style={{ backgroundColor: theme.cardColor, borderColor: theme.borderColor }}
        className="max-w-md w-full p-4 rounded-2xl shadow-2xl border flex flex-col gap-2"
      >
        <h3 className="font-bold mb-2">Цветовая палитра {previewTheme === 'dark' ? 'тёмной' : 'светлой'} темы</h3>

        {Object.entries(theme).map(([key, value]) =>
          key !== 'isDark' ? (
            <div key={key} className="flex flex-col w-full">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenColor(openColor === key ? null : key)}
              >
                <div className="w-10 h-10 rounded border" style={{ backgroundColor: value as string, borderColor: theme.borderColor }}></div>
                <span>{key}: {value}</span>
              </div>
              {openColor === key && (
                <div className="p-2 mt-1 text-sm rounded bg-gray-100 dark:bg-gray-800 transition-colors">
                  {colorDescriptions[key] || "Описание отсутствует."}
                  <div className="mt-2 w-full h-10 rounded" style={{ backgroundColor: value as string, border: `1px solid ${theme.borderColor}` }}></div>
                </div>
              )}
            </div>
          ) : null
        )}


      </div>
      {tgTheme && (
        <div
          style={{ backgroundColor: theme.cardColor, borderColor: theme.borderColor }}
          className="max-w-md w-full p-4 rounded-2xl shadow-2xl border mt-4"
        >
          <h3 className="font-bold mb-2">JSON темы Telegram</h3>
          <pre
            style={{
              backgroundColor: theme.secondaryBgColor,
              color: theme.textColor,
              padding: '10px',
              borderRadius: '8px',
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(tgTheme, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}