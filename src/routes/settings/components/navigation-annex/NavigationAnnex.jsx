import React from 'react';
import { ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import {
  People as PeopleIcon,
  Equalizer as EqualizerIcon,
  Notes as NotesIcon
} from '@material-ui/icons';
import { Link, } from 'react-router-dom';

const NavigationAnnex = (props) => {
  return (
    <>
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
    </>
  );
};

export default NavigationAnnex;