import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Link, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import {
  Lock as LockIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import AppraisalService from '../../services/AppraisalService';
import GlobalContext from '../../services/GlobalContext';
import NewPeriodDialog from '../../components/new-period-dialog';
import LoginRequired from '../../components/shared/login-required';
import AppraisalDetailsPage from '../appraisal-details';
import ListItemsDisplay from '../../components/shared/list-items-display/ListItemsDisplay';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  centerButton: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10, 0),
  },
  card: {
    minWidth: 300,
    width: '15vw',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  cardActions: {
    height: '100%',
  },
  gridFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  linkDecoration: {
    textDecoration: 'none',
    alignSelf: 'flex-end',
  },
}));

const AppraisalsPage = () => {
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const global = useContext(GlobalContext);
  const classes = useStyles();
  const { path } = useRouteMatch();
  const [itemMenuAnchorEl, setItemMenuAnchorEl] = useState(null);

  const handleClickPeriodMenu = (evt) => {
    setItemMenuAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setItemMenuAnchorEl(null);
  };

  const clickFinishHandler = (item) => async () => {
    const result = await AppraisalService.finishPeriod(item.id);
    if (result) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...item, status: 'Finished' } : i)));
    }
    handleClose();
  };

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
          <Container maxWidth="md">
            <LoginRequired />
            <Grid container>
              <Grid item xs={12}>
                <h1 className={classes.header}>Appraisals</h1>
              </Grid>
              <Grid item xs={12}>
                <h2 className={classes.header}>Opened</h2>
              </Grid>
              <Grid item xs={12} className={classes.gridFlex}>
                <ListItemsDisplay collection={items.filter((item) => item.status === 'Active')}>
                  {items.filter((item) => item.status === 'Active').map((item) => (
                    <Card key={item.id} className={classes.card}>
                      <CardHeader
                        action={(
                          <>
                            <IconButton data-itemid={item.id} aria-label="menu" color="inherit" tabIndex={-1} onClick={handleClickPeriodMenu}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id={`item-menu-${item.id}`}
                              anchorEl={itemMenuAnchorEl}
                              keepMounted
                              open={Boolean(itemMenuAnchorEl) && itemMenuAnchorEl.dataset.itemid === item.id}
                              onClose={handleClose}
                              getContentAnchorEl={null}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                              <MenuItem onClick={clickFinishHandler(item)}>
                                <ListItemIcon>
                                    <LockIcon fontSize="small" />
                                  </ListItemIcon>
                                <ListItemText primary="Finish" />
                              </MenuItem>
                            </Menu>
                          </>
                      )}
                        title={item.name}
                        subheader={item.status}
                      />
                      <CardContent>
                        <Typography variant="body1" component="p">
                          Created by:
                          {' '}
                          {item.createdUser.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {(new Date(item.createdDate)).toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Link to={`/appraisals/${item.id}`} className={classes.linkDecoration}>
                          <Button variant="contained" color="primary">
                            Open
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  ))}
                </ListItemsDisplay>
              </Grid>
              <Grid item xs={12}>
                <h2 className={classes.header}>Closed</h2>
              </Grid>
              <Grid item xs={12} className={classes.gridFlex}>
                <ListItemsDisplay collection={items.filter((item) => item.status !== 'Active')}>
                  {items.filter((item) => item.status !== 'Active').map((item) => (
                    <Card key={item.id} className={classes.card}>
                      <CardHeader
                        action={(
                          <IconButton aria-label="actions">
                            <MoreVertIcon />
                          </IconButton>
                        )}
                        title={item.name}
                        subheader={item.status}
                      />
                      <CardContent>
                        <Typography variant="body1" component="p">
                          Created by:
                          {' '}
                          {item.createdUser.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {(new Date(item.createdDate)).toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Link to={`/appraisals/${item.id}`} className={classes.linkDecoration}>
                          <Button variant="contained" color="primary">
                            Open
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  ))}
                </ListItemsDisplay>
              </Grid>
              <Grid item xs={12} className={classes.centerButton}>
                <Button onClick={() => setDialogOpen(true)} variant="contained" color="primary">
                  New Period
                </Button>
              </Grid>
              {/* Dialogs */}
              <NewPeriodDialog
                open={dialogOpen}
                context={global}
                handleClose={() => setDialogOpen(false)}
                setItems={setItems}
              />
            </Grid>
          </Container>
        </Route>
        <Route exact path={`${path}/:id/user/:userId`}>
          <AppraisalDetailsPage ctx={global} setCtx={global.setContext} />
        </Route>
        <Route path={`${path}/:id`}>
          <AppraisalDetailsPage ctx={global} setCtx={global.setContext} />
        </Route>
      </Switch>
    </>
  );
};

export default AppraisalsPage;
