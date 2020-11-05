import { Grid, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import React, { useContext, useState } from 'react';
import GlobalContext from '../../services/GlobalContext';
import { themeDark, themeLight } from '../../styles/theme';

const SettingsGeneral = (props) => {
  const global = useContext(GlobalContext);
  const [theme, setTheme] = useState(global.userPreferences.theme.palette.type);

  const handleChange = (evt) => {
    let type;
    if (evt.target.checked) {
      type = 'dark';
    } else {
      type = 'light';
    }
    setTheme(type);
    localStorage.setItem('theme', type);
    global.setContext(prev => ({
      ...prev,
      userPreferences: {
        ...global.userPreferences,
        theme: type === 'light' ? createMuiTheme(themeLight) : createMuiTheme(themeDark)
      }
    }));
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h4'>
          General Settings
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Appearence:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Light</Grid>
          <Grid item>
            <Switch checked={theme === 'dark'} onChange={handleChange} />
          </Grid>
          <Grid item>Dark</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SettingsGeneral;