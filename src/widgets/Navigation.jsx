import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsIcon from '@material-ui/icons/Settings';
import PieChartIcon from '@material-ui/icons/PieChart';
import { Toolbar, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';

/*
 * TODO: extract all styles in a makeStyle
 */

export default function Navigation()
{
    const [navPaneOpened, setOpened] = useState(false);

    const toggleDrawer = (e) => {
        setOpened(!navPaneOpened);
    };

    const ListItemLink = (props) => {
        return <ListItem button component={Link} {...props}/>
    }

    return (
        <div onClick={() => { if (navPaneOpened) setOpened(false) }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' arial-label='menu' onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={navPaneOpened} position='static' onClose={() => setOpened(false)} >
                <CallToActionIcon fontSize='large' style={{alignSelf: 'center', margin: '10 0 10 0'}} />
                <List style={{minWidth: '25vw'}}>
                    <ListItemLink to="/">
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemLink>
                    <ListItemLink to="/appraisals">
                        <ListItemIcon>
                            <FeedbackIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Appraisals"/>
                    </ListItemLink>
                    <ListItemLink to="/reports">
                        <ListItemIcon>
                            <PieChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Reports"/>
                    </ListItemLink>
                    <ListItemLink to="/settings">
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItemLink>
                </List>
            </Drawer>
        </div>
    );
}