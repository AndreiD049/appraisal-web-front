import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Grid } from '@material-ui/core';
import { Link, } from 'react-router-dom';
import AppraisalService from '../services/AppraisalService';
import ApButton from '../components/ApButton';
import NewPeriodDialog from '../widgets/NewPeriodDialog';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center'
    },
    centerButton: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(10, 0)
    }
}));

const ListItemLink = ({context, ...props}) => <ListItem component={Link} {...props}/>

const AppraisalsPage = ({context, ...props}) => {
    const [items, setItems] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        async function loadData() {
            setItems(await AppraisalService.getPeriods(context));
        }
        loadData();
    }, [context]);

    return (
        <Container maxWidth='md'>
            <Grid container>
                <Grid item xs={12}>
                    <h1 className={classes.header}>Appraisals</h1>
                </Grid>
                <Grid item xs={12}>
                    <h2 className={classes.header}>Opened</h2>
                    <List>
                        {items.filter((item) => item.status === 'Active').map((item, idx) => {
                            return (
                                <ListItemLink key={item.id} to={`/appraisals/${item.id}`}>
                                    <ListItemText primary={item.name}/>
                                </ListItemLink>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <h2 hidden={items.filter(i => i.status !== 'Active').length !== 0 ? false : true} className={classes.header}>Closed</h2>
                    <List>
                        {items.filter((item) => item.status !== 'Active').map((item, idx) => {
                            return (
                                <ListItemLink key={item.id} to={`/appraisals/${item.id}`}>
                                    <ListItemText primary={item.name}/>
                                </ListItemLink>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={12} className={classes.centerButton}>
                    <ApButton context={context} onClick={() => setDialogOpen(true)} variant='contained' color='primary'>
                        New Period
                    </ApButton>
                </Grid>
                {/* Dialogs */}
                <NewPeriodDialog open={dialogOpen} context={context} handleClose={() => setDialogOpen(false)} />
            </Grid>
        </Container>
    );
};

export default AppraisalsPage;