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
                    <DesktopMacIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText secondary='General' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='users'>
            <ListItem button component={Link} to='/settings/users'>
                <ListItemIcon>
                    <PeopleIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText secondary='Users' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='appraisal-periods'>
            <ListItem button component={Link} to='/settings/appraisal-periods'>
                <ListItemIcon>
                    <EqualizerIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText secondary='Appraisal-periods' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='appraisal-items'>
            <ListItem button component={Link} to='/settings/appraisal-items'>
                <ListItemIcon>
                    <NotesIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText secondary='Appraisal-items' />
            </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='SETTINGS' grant='permissions'>
            <ListItem button component={Link} to='/settings/permissions'>
                <ListItemIcon>
                    <KeyIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText secondary='Permissions' />
            </ListItem>
        </AuthorizationComponent>
    </List>
  );
};

export default SettingsNavigation;