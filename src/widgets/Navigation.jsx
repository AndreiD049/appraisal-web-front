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
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Toolbar, ListItemIcon, Button, Typography, Link as MuiLink, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

/*
 * TODO: extract all styles in a makeStyle
 */

 const useStyles = makeStyles((theme) => ({
     root: {
         flexGrow: 1,
     },
     title: {
         flexGrow: 1
     },
 }))

export default function Navigation({ctx})
{
    const [navPaneOpened, setOpened] = useState(false);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const classes = useStyles();

    const handleClickUserMenu = (evt) => {
        setUserMenuAnchorEl(evt.currentTarget);
    }

    const handleClose = () => {
        setUserMenuAnchorEl(null);
    }

    const toggleDrawer = (e) => {
        setOpened(!navPaneOpened);
    };

    const ListItemLink = (props) => {
        return <ListItem button component={Link} {...props}/>
    }

    return (
        <div onClick={() => { if (navPaneOpened) setOpened(false) }}>
            <AppBar position='static' className={classes.root}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' arial-label='drawer' onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        Admin TC
                    </Typography>
                    {
                        ctx.isAuth() ?  
                            <Toolbar>
                                <Typography variant='body1'>Hey, {ctx.user.id}</Typography>
                                <IconButton aria-label='menu' color='inherit' onClick={handleClickUserMenu}>
                                    <ArrowDropDownCircleIcon />
                                </IconButton>
                                <Menu 
                                    id='user-menu'
                                    anchorEl={userMenuAnchorEl}
                                    keepMounted
                                    open={Boolean(userMenuAnchorEl)}
                                    onClose={handleClose}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center'
                                    }}
                                >
                                    <MuiLink href='/api/logout' color='inherit'>
                                        <MenuItem>Logout</MenuItem>
                                    </MuiLink>
                                </Menu>
                            </Toolbar> :
                            <div>
                                <MuiLink href="/api/login" color='inherit'>
                                    <Button edge='end' color='inherit'>Login</Button>
                                </MuiLink>
                            </div>
                    }
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