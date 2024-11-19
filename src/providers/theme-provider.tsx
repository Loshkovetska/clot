"use client";
import { cn } from "@/lib/utils";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext({
  theme: "light",
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDarkMode = false; //new Date().getHours() >= 16;
    const documentClassList = document?.documentElement?.classList;
    setTheme(isDarkMode ? "dark" : "light");

    isDarkMode
      ? documentClassList?.add("dark")
      : documentClassList?.remove("dark");
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
      }}
    >
      <div
        className={cn(
          "flex flex-col grow",
          theme === "dark" ? "bg-dark" : "bg-white-100"
        )}
      >
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
}
