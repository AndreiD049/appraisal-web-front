import React from 'react'
import { Link } from 'react-router-dom';
import {
  People as PeopleIcon,
  Equalizer as EqualizerIcon,
  Notes as NotesIcon,
  DesktopMac as DesktopMacIcon,
  VpnKey as KeyIcon
} from '@material-ui/icons'
import  {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import AuthorizationComponent from '../../../shared/authorization-component';

const SettingsNavigation = (props) => {
  return (
    <List component="div" disablePadding>
        <AuthorizationComponent code='SETTINGS' grant='general'>
            <ListItem button component={Link} to='/settings'>
                <ListItemIcon>
                    <DesktopMacIcon />
                </ListItemIcon>
                <ListItemText primary='General' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='users'>
            <ListItem button component={Link} to='/settings/users'>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary='Users' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='appraisal-periods'>
            <ListItem button component={Link} to='/settings/appraisal-periods'>
                <ListItemIcon>
                    <EqualizerIcon/>
                </ListItemIcon>
                <ListItemText primary='Appraisal-periods' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='appraisal-items'>
            <ListItem button component={Link} to='/settings/appraisal-items'>
                <ListItemIcon>
                    <NotesIcon/>
                </ListItemIcon>
                <ListItemText primary='Appraisal-items' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='permissions'>
            <ListItem button component={Link} to='/settings/permissions'>
                <ListItemIcon>
                    <KeyIcon />
                </ListItemIcon>
                <ListItemText primary='Permissions' />
            </ListItem>
        </AuthorizationComponent>
    </List>
  );
};

export default SettingsNavigation;