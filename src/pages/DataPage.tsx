import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../hooks/useThemeColors";
import { useTelegram } from "../context/TelegramContext";

export default function DataPage() {
    const theme = useThemeColors();
    const { sendData } = useTelegram();
    const navigate = useNavigate();

    const handleSendData = () => {
        sendData({
            action: "get_data",
            value: 123,
            timestamp: Date.now()
        });
    };

    const handleSendExcel = () => {
        sendData({
            action: "get_excel",
            type: "excel",
            payload: [
                { id: 1, name: "Item 1", value: 100 },
                { id: 2, name: "Item 2", value: 200 },
                { id: 3, name: "Item 3", value: 300 }
            ],
            timestamp: Date.now()
        });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: theme.bgColor, color: theme.textColor }}
        >
            <div
                className="w-full max-w-md p-6 rounded-2xl shadow-2xl border flex flex-col gap-4"
                style={{
                    backgroundColor: theme.cardColor,
                    borderColor: theme.borderColor
                }}
            >
                <h2 className="text-xl font-bold">
                    Отправка данных
                </h2>

                <p style={{ color: theme.hintColor }}>
                    Выберите действие ниже:
                </p>

                {/* Кнопка: Получить данные */}
                <button
                    onClick={handleSendData}
                    className="px-4 py-3 rounded-xl font-semibold transition-transform active:scale-95"
                    style={{
                        backgroundColor: theme.buttonColor,
                        color: theme.buttonTextColor
                    }}
                >
                    🚀 Получить данные
                </button>

                {/* Кнопка: Получить Excel */}
                <button
                    onClick={handleSendExcel}
                    className="px-4 py-3 rounded-xl font-semibold transition-transform active:scale-95"
                    style={{
                        backgroundColor: theme.buttonColor,
                        color: theme.buttonTextColor
                    }}
                >
                    📊 Получить Excel
                </button>

                <div
                    className="h-px w-full"
                    style={{ backgroundColor: theme.borderColor }}
                />

                {/* Назад */}
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 rounded-xl font-medium transition-transform active:scale-95"
                    style={{
                        backgroundColor: theme.secondaryBgColor,
                        color: theme.textColor
                    }}
                >
                    ← Назад
                </button>
            </div>
        </div>
    );
}