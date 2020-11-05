import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../services/GlobalContext';

const ThemeController = (props) => {
  const global = useContext(GlobalContext);
  const [themeType, setThemeType] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    let type = localStorage.getItem('theme');
    if (type) {
      console.log('Found in localstorage ', type);
      const contextTheme = global.context &&
        global.context.userPreferences && 
        global.context.userPreferences.theme;
      if (contextTheme && contextTheme !== type) {
        global.setContext(prev => ({
          ...prev,
          context: {
            ...prev.context,
            userPreferences: {
              ...(prev.contenxt ? prev.context.userPreferences : null),
              theme: type
            }
          }
        }));
      }
    } else {
      type = global.context.userPreferences && global.context.userPreferences.theme ?
        global.context.userPreferences.theme : 'light';
      localStorage.setItem('theme', type);
    }
    setThemeType(prev => type);
  }, [global])

  const theme = createMuiTheme({
    palette: {
      type: themeType
    },
    typography: {
      fontFamily: [
        'Roboto',
        'Arial',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export default ThemeController;
