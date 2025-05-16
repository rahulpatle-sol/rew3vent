"use client";
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps as NextThemesProviderProps} from "next-themes/dist/types"


// This context is mostly a wrapper around next-themes for now.
// It can be expanded if more complex theme logic is needed.

interface ThemeContextType {
  theme?: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

const CustomThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function CustomThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeInternalProvider>{children}</ThemeInternalProvider>
    </NextThemesProvider>
  );
}

function ThemeInternalProvider({children} : {children: ReactNode}){
  const { theme, setTheme, themes } = useNextTheme();
  const value = useMemo(() => ({ theme, setTheme, themes }), [theme, setTheme, themes]);
  
  return (
    <CustomThemeContext.Provider value={value}>
      {children}
    </CustomThemeContext.Provider>
  );
}


export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
