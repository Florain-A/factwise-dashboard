import factwiseLogo from "../assets/factwise-logo.png";
import AccessibilityMenu from "./accessibilityMenu";

function Header({
  theme,
  setTheme,
  language,
  setLanguage,
  setFontScale,
  t,
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <img
            src={factwiseLogo}
            alt="FactWise logo"
            className="header-logo"
          />

          <div className="brand-content">
            <h1>FactWise</h1>

            {t.dashboardSubtitle && (
              <p>{t.dashboardSubtitle}</p>
            )}
          </div>
        </div>

        <AccessibilityMenu
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          setFontScale={setFontScale}
          t={t}
        />
      </div>
    </header>
  );
}

export default Header;