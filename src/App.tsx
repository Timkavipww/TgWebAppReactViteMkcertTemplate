import { useNavigate } from "react-router-dom";
import { useTelegram } from "./context/TelegramContext";
import { useThemeColors } from "./hooks/useThemeColors";

export default function App() {
  const { user, theme } = useTelegram();
  const navigate = useNavigate();

  const {
    bgColor,
    textColor,
    buttonColor,
    buttonTextColor,
    linkColor,
    hintColor,
    cardColor,
    borderColor,
    glowColor,
    isDark
  } = useThemeColors();

  // 🖌 Цветовая палитра Telegram + твоя тема
  const colorPalette = [
    { label: 'BG', value: bgColor },
    { label: 'Card', value: cardColor },
    { label: 'Text', value: textColor },
    { label: 'Hint', value: hintColor },
    { label: 'Button', value: buttonColor },
    { label: 'Button Text', value: buttonTextColor },
    { label: 'Link', value: linkColor },
    { label: 'Border', value: borderColor },
    { label: 'Glow', value: glowColor },
    // Telegram цвета
    { label: 'TG BG', value: theme?.bg_color },
    { label: 'TG Text', value: theme?.text_color },
    { label: 'TG Hint', value: theme?.hint_color },
    { label: 'TG Button', value: theme?.button_color },
    { label: 'TG Button Text', value: theme?.button_text_color },
    { label: 'TG Link', value: theme?.link_color },
  ];

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, minHeight: '100vh' }}
      className="p-4 flex flex-col items-center justify-start gap-6">

      {/* Профиль */}
      <div className="relative max-w-md w-full p-6 rounded-2xl shadow-2xl border"
        style={{ backgroundColor: cardColor, borderColor: borderColor }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: textColor }}>Профиль Telegram</h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <img
              src={user?.photo_url}
              alt="avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            {/* <span style={{ color: textColor }}><b>Name:</b> {user?.first_name.slice(0, 10)} {user?.last_name.slice(0, 10)}</span> */}
            <span style={{ color: hintColor }}><b>Username:</b> @{user?.username}</span>
            <span style={{ color: hintColor }}><b>ID:</b> {user?.id}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/data')}
          className="px-4 py-2 rounded-lg font-semibold"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          Перейти на Data
        </button>
      </div>

      {/* Цветовая палитра */}
      <div className="max-w-md w-full p-4 rounded-2xl shadow-2xl border flex flex-wrap gap-2"
        style={{ backgroundColor: cardColor, borderColor: borderColor }}>
        <h3 className="font-bold mb-2" style={{ color: textColor }}>Цветовая палитра {isDark ? 'тёмной' : 'светлой'} темы</h3>
        {colorPalette.map((c, i) => (
          <div key={i} className="flex items-center gap-2 w-full">
            <div className="w-10 h-10 rounded border" style={{ backgroundColor: c.value || '#000', borderColor: borderColor }}></div>
            <span style={{ color: textColor }}>{c.label}: {c.value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}