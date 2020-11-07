import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import HomePlannedItems from '../../components/home-planned-items';
import AuthorizationComponent from '../../components/shared/authorization-component';

const HomePage = () => (
  <>
    <h1 style={{ textAlign: 'center' }}>HomePage</h1>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <AuthorizationComponent code="APPRAISAL DETAILS" grant="read">
          <HomePlannedItems />
        </AuthorizationComponent>
      </Grid>
    </Grid>
  </>
);

export default HomePage;
