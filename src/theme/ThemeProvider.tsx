import React, {createContext, useState} from 'react';
import {themeSettings, useMode} from './theme';
import {Theme} from './model/theme.interface';

type ThemeContextType = {
  theme: Theme;
  changeTheme: React.Dispatch<React.SetStateAction<string>> | null;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themeSettings('dark'),
  changeTheme: null,
});

const ThemeProvider = ({children}: {children?: React.ReactNode}) => {
  const {theme, changeTheme} = useMode();

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
