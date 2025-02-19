import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import { selectTheme } from 'src/redux/options/selectors';
import { useState, useEffect } from 'react';

export const Theme = ({ children }) => {
  const { lightTheme } = theme;

  const [themeState, setThemeState] = useState(lightTheme);

  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    if (currentTheme === 'light') {
      setThemeState(lightTheme);
    }
  }, [currentTheme, lightTheme]);

  return <ThemeProvider theme={themeState}>{children}</ThemeProvider>;
};
