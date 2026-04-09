import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../hooks/useThemeColors";

export default function DataPage() {
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

    const navigate = useNavigate();
    return (
        <div>
            Data Page
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
                Back to Home
            </button>
        </div>

    );
}