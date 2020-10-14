import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import theme from './styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);