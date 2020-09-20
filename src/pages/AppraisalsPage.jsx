import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardHeader, IconButton, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { Link, } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppraisalService from '../services/AppraisalService';
import ApButton from '../components/ApButton';
import NewPeriodDialog from '../widgets/NewPeriodDialog';
import LoginRequired from '../widgets/LoginRequired';

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

const AppraisalsPage = ({ctx, setCtx, ...props}) => {
    const [items, setItems] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        async function loadData() {
            setItems(await AppraisalService.getPeriods(ctx));
        }
        loadData();
    }, [ctx]);

    return (
        <Container maxWidth='md'>
            <LoginRequired ctx={ctx} setCtx={setCtx} />
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
                    <ApButton ctx={ctx} onClick={() => setDialogOpen(true)} variant='contained' color='primary'>
                        New Period
                    </ApButton>
                </Grid>
                {/* Dialogs */}
                <NewPeriodDialog open={dialogOpen} ctx={ctx} setCtx={setCtx} handleClose={() => setDialogOpen(false)} />
            </Grid>
        </Container>
    );
};

export default AppraisalsPage;