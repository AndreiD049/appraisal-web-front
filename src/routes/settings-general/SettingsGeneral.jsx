import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';

const SettingsGeneral = (props) => {
  const [teams, setTeams] = useState(null);


  
  useEffect(() => {
    async function run() {
      const teams = await TeamService.getTeams();
      setTeams(teams);
    }  
    run();
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
      <h1>General Settings</h1>
      </Grid>
      <Grid item xs={12}>
        {`${teams}`}
      </Grid>
    </Grid>
  );
}

export default SettingsGeneral;