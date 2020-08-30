import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import {
    Link,
} from 'react-router-dom';

const testData = [
    {
        name: "Appraisal 01/01/2020 - 06/06/2020",
        status: 'open',
        id: 1
    },
    {
        name: "Appraisal 01/06/2020 - 01/01/2021",
        status: 'open',
        id: 2
    },
    {
        name: "Appraisal 01/01/2021 - 06/06/2021",
        status: 'open',
        id: 3
    },
    {
        name: "Appraisal 01/06/2021 - 01/01/2022",
        status: 'open',
        id: 4
    },
    {
        name: "Appraisal 01/06/2010 - 01/01/2010",
        status: 'closed',
        id: 5
    },
    {
        name: "Appraisal 01/06/2011 - 01/01/2012",
        status: 'closed',
        id: 6
    },
];

const useStyles = makeStyles({
    header: {
        textAlign: 'center'
    }
});

const ListItemLink = (props) => <ListItem component={Link} {...props}/>

const Appraisals = (props) => {
    const classes = useStyles();
    const items = testData;

    return (
        <Container maxWidth='md'>
            <h1 className={classes.header}>Appraisals</h1>
            <h2 className={classes.header}>Opened</h2>
            <List>
                {items.filter((item) => item.status === 'open').map((item, idx) => {
                    return (
                        <ListItemLink key={item.id} to={`/appraisals/${item.id}`}>
                            <ListItemText primary={item.name}/>
                        </ListItemLink>
                    );
                })}
            </List>
            <h2 className={classes.header}>Closed</h2>
                <List>
                    {items.filter((item) => item.status !== 'open').map((item, idx) => {
                        return (
                            <ListItemLink key={item.id} to={`/appraisals/${item.id}`}>
                                <ListItemText primary={item.name}/>
                            </ListItemLink>
                        );
                    })}
                </List>
        </Container>
    );
};

export default Appraisals;