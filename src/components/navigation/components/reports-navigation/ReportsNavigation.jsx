import React from 'react'
import { Link } from 'react-router-dom';
import {
  Assessment as AssessmentIcon,
  FileCopy as FileCopyIcon
} from '@material-ui/icons'
import  {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import AuthorizationComponent from '../../../shared/authorization-component';

const ReportsNavigation = (props) => {
  return (
    <List component="div" disablePadding>
        <AuthorizationComponent code='REPORTS' grant='read'>
          <ListItem button component={Link} to='/reporting'>
              <ListItemIcon>
                  <AssessmentIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText secondary='Reports' />
          </ListItem>
        </AuthorizationComponent>
        <AuthorizationComponent code='REPORT-TEMPLATES' grant='read'>
          <ListItem button component={Link} to='/reporting/templates'>
              <ListItemIcon>
                  <FileCopyIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText secondary='Templates' />
          </ListItem>
        </AuthorizationComponent>
    </List>
  );
};

export default ReportsNavigation;