import { useEffect, useState } from "react";

const useMode = () => {
  const [theme, setTheme] = useState(localStorage.theme);

  const currentTheme = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const myRoot = window.document.documentElement;
    myRoot.classList.remove(currentTheme);
    myRoot.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, currentTheme]);
  return [currentTheme, setTheme];
};
export default useMode;
