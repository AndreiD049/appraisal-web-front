import React from 'react';
import HomePlannedItems from '../../components/home-planned-items';
import AuthorizationComponent from '../../components/shared/authorization-component'
import {
  Grid
} from '@material-ui/core';

const HomePage = ({ctx, setCtx, ...props}) => {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>HomePage</h1>
      <Grid container>
          <Grid item xs={6}>
            <AuthorizationComponent code='APPRAISAL DETAILS' grant='read'>
              <HomePlannedItems/>
            </AuthorizationComponent>
          </Grid>
        <Grid item xs={6}>
          <AuthorizationComponent code='APPRAISAL DETAILS' grant='read'>
            <HomePlannedItems/>
          </AuthorizationComponent>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;