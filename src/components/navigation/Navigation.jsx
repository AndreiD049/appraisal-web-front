import React, { useContext, useState } from 'react';
import {
    Menu as  MenuIcon,
    Home as HomeIcon,
    CallToAction,
    Feedback as FeedbackIcon,
    Settings as SettingsIcon,
    PieChart as PieChartIcon,
    ArrowDropDownCircle,
    Build as BuildIcon,
} from '@material-ui/icons';
import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton, Divider
} from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles';
import { Toolbar, ListItemIcon, Button, Typography, Link as MuiLink, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom'
import GlobalContext from '../../services/GlobalContext';

export default function Navigation({ annexElements })
{
    const global = useContext(GlobalContext);
    const [navPaneOpened, setOpened] = useState(false);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const classes = styles();

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
            <AppBar 
                position='fixed' 
                className={clsx( classes.root, classes.appBar, {
                    [classes.appBarShift]: navPaneOpened
                })
            }>
                <Toolbar >
                    <IconButton 
                        edge='start' 
                        color='inherit' 
                        arial-label='drawer' 
                        onClick={toggleDrawer}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: navPaneOpened,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <BuildIcon style={{marginRight: 15}}/>
                    <Typography variant='h6' className={clsx(classes.title)}>
                        Admin Tools 
                    </Typography>
                    {
                        global.context.isAuth() ?  
                            <Toolbar>
                                <Typography variant='body1'>Hey, {global.context.user.id}</Typography>
                                <IconButton aria-label='menu' color='inherit' onClick={handleClickUserMenu}>
                                    <ArrowDropDownCircle />
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
                                { global.context.user !== null ?
                                <MuiLink href="/api/login" color='inherit'>
                                    <Button edge='end' color='inherit'>Login</Button>
                                </MuiLink>
                                :
                                null
                                }
                            </div>
                    }
                </Toolbar>
            </AppBar>
            <AppBar position="relative">
                <IconButton 
                    edge='start' 
                    color='inherit' 
                    arial-label='drawer' 
                    onClick={toggleDrawer}
                    className={clsx(classes.menuButton, {
                        [classes.hide]: navPaneOpened,
                    })}
                >
                    <MenuIcon />
                </IconButton>
            </AppBar>
            <Drawer 
                variant='permanent'
                anchor='left' 
                open={navPaneOpened} 
                // position='static' 
                onClose={() => setOpened(false)} 
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: navPaneOpened,
                    [classes.drawerClose]: !navPaneOpened
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: navPaneOpened,
                        [classes.drawerClose]: !navPaneOpened
                    })
                }}
            >
                <IconButton onClick={handleClose}>
                    <CallToAction fontSize='large' style={{alignSelf: 'center'}} />
                </IconButton>
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
                    {
                        annexElements ? 
                       (<>
                            <Divider/>
                            {annexElements}
                        </>) :
                        null
                    }
                </List>
            </Drawer>
        </div>
    );
}