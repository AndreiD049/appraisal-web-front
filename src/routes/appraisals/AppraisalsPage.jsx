import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardHeader, IconButton, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppraisalService from '../../services/AppraisalService';
import GlobalContext from '../../services/GlobalContext';
import NewPeriodDialog from '../../components/new-period-dialog';
import LoginRequired from '../../widgets/LoginRequired';
import AppraisalDetailsPage from '../../routes/appraisal-details'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center'
  },
  centerButton: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10, 0)
  },
  card: {
    minWidth: 300,
    width: '15vw',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  cardActions: {
    height: '100%'
  },
  gridFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  linkDecoration: {
    textDecoration: 'none',
    alignSelf: 'flex-end'
  },
}));

const AppraisalsPage = (props) => {
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const global = useContext(GlobalContext);
  const classes = useStyles();
  const { path } = useRouteMatch();
  
  useEffect(() => {
    async function loadData() {
      setItems(await AppraisalService.getPeriods());
    }
    loadData();
  }, []);
  
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Container maxWidth='md'>
            <LoginRequired />
            <Grid container>
              <Grid item xs={12}>
                <h1 className={classes.header}>Appraisals</h1>
              </Grid>
              <Grid item xs={12}>
                <h2 className={classes.header}>Opened</h2>
              </Grid>
              <Grid item xs={12} className={classes.gridFlex}>
                {items.filter((item) => item.status === 'Active').map((item, idx) => {
                  return (
                  <Card key={item.id} className={classes.card}>
                    <CardHeader 
                      action={
                        <IconButton aria-label="actions">
                        <MoreVertIcon/>
                        </IconButton>
                      }
                      title={item.name}
                      subheader={item.status}
                    />
                    <CardContent>
                      <Typography variant='body1' component='p'>
                        Created by: {item.createdUser}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' component='p'>
                        {(new Date(item.createdDate)).toLocaleString()}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Link to={`/appraisals/${item.id}`} className={classes.linkDecoration}>
                        <Button variant='contained' color='primary'>
                          Open
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <h2 hidden={items.filter(i => i.status !== 'Active').length !== 0 ? false : true} className={classes.header}>Closed</h2>
              </Grid>
              <Grid item xs={12} className={classes.gridFlex}>
                {items.filter((item) => item.status !== 'Active').map((item, idx) => {
                  return (
                    <Card key={item.id} className={classes.card}>
                      <CardHeader 
                        action={
                          <IconButton aria-label="actions">
                          <MoreVertIcon/>
                          </IconButton>
                        }
                        title={item.name}
                        subheader={item.status}
                      />
                      <CardContent>
                        <Typography variant='body1' component='p'>
                          Created by: {item.createdUser}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                          {(new Date(item.createdDate)).toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Link to={`/appraisals/${item.id}`} className={classes.linkDecoration}>
                          <Button variant='contained' color='primary'>
                            Open
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  );
                })}
              </Grid>
              <Grid item xs={12} className={classes.centerButton}>
                <Button onClick={() => setDialogOpen(true)} variant='contained' color='primary'>
                  New Period
                </Button>
              </Grid>
                {/* Dialogs */}
              <NewPeriodDialog open={dialogOpen} context={global.context} handleClose={() => setDialogOpen(false)} setItems={setItems} />
            </Grid>
          </Container>
        </Route>
        <Route exact path={`${path}/:id/user/:userId`}>
          <AppraisalDetailsPage ctx={global.context} setCtx={global.setContext}/>
        </Route>
        <Route path={`${path}/:id`}>
          <AppraisalDetailsPage ctx={global.context} setCtx={global.setContext}/>
        </Route>
      </Switch>
    </>
    );
  };
    
    export default AppraisalsPage;