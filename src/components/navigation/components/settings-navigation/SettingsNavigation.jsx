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

const SettingsNavigation = (props) => {
  return (
    <List component="div" disablePadding>
        <ListItem button component={Link} to='/settings'>
            <ListItemIcon>
                <DesktopMacIcon />
            </ListItemIcon>
            <ListItemText primary='General' />
        </ListItem>
        <ListItem button component={Link} to='/settings/users'>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary='Users' />
        </ListItem>
        <ListItem button component={Link} to='/settings/appraisal-periods'>
            <ListItemIcon>
                <EqualizerIcon/>
            </ListItemIcon>
            <ListItemText primary='Appraisal-periods' />
        </ListItem>
        <ListItem button component={Link} to='/settings/appraisal-items'>
            <ListItemIcon>
                <NotesIcon/>
            </ListItemIcon>
            <ListItemText primary='Appraisal-items' />
        </ListItem>
        <ListItem button component={Link} to='/settings/permissions'>
            <ListItemIcon>
                <KeyIcon />
            </ListItemIcon>
            <ListItemText primary='Permissions' />
        </ListItem>
    </List>
  );
};

export default SettingsNavigation;