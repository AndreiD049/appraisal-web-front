import React, { useContext, useState } from 'react';
import {
    Menu as  MenuIcon,
    Home as HomeIcon,
    CallToAction,
    Feedback as FeedbackIcon,
    Settings as SettingsIcon,
    PieChart as PieChartIcon,
    ExpandMore as ExpandMoreIcon,
    ArrowDropDownCircle,
    Build as BuildIcon,
    ExpandLess as ExpandLessIcon,
} from '@material-ui/icons';
import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    IconButton
} from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles';
import { Toolbar, ListItemIcon, Button, Typography, Link as MuiLink, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom'
import GlobalContext from '../../services/GlobalContext';
import SettingsNavigation from './components/settings-navigation';
import AuthorizationComponent from '../shared/authorization-component';

export default function Navigation()
{
    const global = useContext(GlobalContext);
    const [navPaneOpened, setOpened] = useState(false);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const [collapses, setCollapses] = useState({
        'settings': false,
    })
    const classes = styles();

    const handleCollapseToggle = (type) => (e) => {
        setCollapses(prev => ({...prev, [type]: !prev[type]}));
    };

    const handleClickUserMenu = (evt) => {
        setUserMenuAnchorEl(evt.currentTarget);
    }

    const handleClose = () => {
        setUserMenuAnchorEl(null);
    }

    const toggleDrawer = (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setOpened(!navPaneOpened);
    };

    const ListItemLink = (props) => {
        return <ListItem button component={Link} {...props}/>
    }


    return (
        <div>
            <AppBar 
                id='app-bar-fixed'
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
                        global.context.user ?  
                            <Toolbar>
                                <Typography variant='body1'>Hey, {global.context.user.username}</Typography>
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
                                { global.context.userLoaded ?
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
            <div style={{
                width: '100%',
                height: (document.getElementById('app-bar-fixed') ? document.getElementById('app-bar-fixed').clientHeight : 0),
            }}></div>
            <Drawer 
                id='navigation-drawer'
                variant='permanent'
                anchor='left' 
                open={navPaneOpened} 
                onClose={() =>  setOpened(false)}
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
                <IconButton onClick={toggleDrawer}>
                    <CallToAction fontSize='large' style={{alignSelf: 'center'}} />
                </IconButton>
                <List>
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
                    <AuthorizationComponent code='SETTINGS' grant='read'>
                        <ListItem button onClick={handleCollapseToggle('settings')}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings"/>
                            {collapses['settings'] ? <ExpandLessIcon/> : <ExpandMoreIcon />}
                        </ListItem>
                        <Collapse in={collapses['settings']}>
                            <SettingsNavigation/>
                        </Collapse>
                    </AuthorizationComponent>
                </List>
            </Drawer>
        </div>
    );
}