import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import TextIncreaseOutlinedIcon from "@mui/icons-material/TextIncreaseOutlined";
import TextDecreaseOutlinedIcon from "@mui/icons-material/TextDecreaseOutlined";

function AccessibilityMenu({
  theme,
  setTheme,
  language,
  setLanguage,
  setFontScale,
  t,
}) {
  const decreaseFontSize = () => {
    setFontScale((currentScale) =>
      Math.max(0.9, Number((currentScale - 0.1).toFixed(1)))
    );
  };

  const increaseFontSize = () => {
    setFontScale((currentScale) =>
      Math.min(1.2, Number((currentScale + 0.1).toFixed(1)))
    );
  };

  return (
    <div className="header-actions">
      <button
        type="button"
        className="nav-action language-button"
        onClick={() =>
          setLanguage((currentLanguage) =>
            currentLanguage === "en" ? "hi" : "en"
          )
        }
        aria-label={t.changeLanguage}
        title={t.changeLanguage}
      >
        <TranslateOutlinedIcon fontSize="small" />

        <span>
          {language === "en" ? "हिं" : "EN"}
        </span>
      </button>

      <div className="accessibility-controls">
        <button
          type="button"
          className="nav-action"
          onClick={decreaseFontSize}
          aria-label={t.decreaseText}
          title={t.decreaseText}
        >
          <TextDecreaseOutlinedIcon fontSize="small" />
        </button>

        <button
          type="button"
          className="nav-action"
          onClick={increaseFontSize}
          aria-label={t.increaseText}
          title={t.increaseText}
        >
          <TextIncreaseOutlinedIcon fontSize="small" />
        </button>
      </div>

      <button
        type="button"
        className="nav-action theme-toggle"
        onClick={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
          )
        }
        aria-label={t.toggleTheme}
        title={t.toggleTheme}
      >
        {theme === "light" ? (
          <DarkModeOutlinedIcon fontSize="small" />
        ) : (
          <LightModeOutlinedIcon fontSize="small" />
        )}
      </button>
    </div>
  );
}

export default AccessibilityMenu;