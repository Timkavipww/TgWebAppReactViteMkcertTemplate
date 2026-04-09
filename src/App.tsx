import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "./context/TelegramContext";
import { useThemeColors } from "./hooks/useThemeColors";

export default function App() {
  const { user, colorScheme } = useTelegram();
  const navigate = useNavigate();

  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>(colorScheme);

  const theme = useThemeColors(previewTheme);
  useEffect(() => {
    setPreviewTheme(colorScheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    const next = previewTheme === 'dark' ? 'light' : 'dark';
    setPreviewTheme(next);
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

      {/* Цветовая палитра */}
      <div
        style={{ backgroundColor: theme.cardColor, borderColor: theme.borderColor }}
        className="max-w-md w-full p-4 rounded-2xl shadow-2xl border flex flex-wrap gap-2"
      >
        <h3 className="font-bold mb-2">Цветовая палитра {previewTheme === 'dark' ? 'тёмной' : 'светлой'} темы</h3>
        {Object.entries(theme).map(([key, value]) =>
          key !== 'isDark' ? (
            <div key={key} className="flex items-center gap-2 w-full">
              <div className="w-10 h-10 rounded border" style={{ backgroundColor: value as string }}></div>
              <span>{key}: {value}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}