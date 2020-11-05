import React, { useState } from 'react'
import { Autocomplete } from '@material-ui/lab';
import { 
  TextField, 
  Grid, 
  Accordion, 
  AccordionSummary, 
  Typography,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Button
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import AuthorizationService from '../../../../services/AuthorizationService';
import useStyles from './styles';

const SecurityDetailsUserDisplay = ({codes, users, userPermissions, setUserPermissions, selectedUser, setSelectedUser, ...props}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);
  const [filter, setFilter] = useState('');

  const handleExpandSingle = (panel) => (e, isExpanded) => {
    if (isExpanded) {
      setExpanded(prev => [...prev, panel]);
    } else {
      setExpanded(prev => prev.filter(e => e !== panel));
    }
  };

  const handleExpandAll = (e) => {
    if (expanded.length === codes.length) {
      setExpanded([]);
    } else {
      setExpanded(codes.map(e => e.code));
    }
  };

  const handleFilterInputChange = (e) => {
    setFilter(e.target.value);
  }

  const handleSetPermission = (user, code, permission) => {
    setUserPermissions(prev => ({
      ...prev, 
      [user.username]: {
        ...prev[user.username],
        [code.code]: permission
      }
    }))
  }

  const handleClick = (user, code, grant) => async (e) => {
    e.persist();
    console.log(user);
    // check if it's a new permission
    if (!userPermissions[user.username] || !userPermissions[user.username][code.code]) {
      const result = await handleAdd(user, code, grant);
      result && handleSetPermission(user, code, result);
    } else if (e.target.checked) {
      // add a grant
      const grants = [...userPermissions[user.username][code.code].grants, grant];
      const result = await handleUpdate({...userPermissions[user.username][code.code], grants: grants});
      result && handleSetPermission(user, code, result);
    } else if (!e.target.checked) {
      const grants = userPermissions[user.username][code.code].grants.filter(g => g !== grant);
      if (grants.length === 0) {
        await handleDelete(userPermissions[user.username][code.code]);
        handleSetPermission(user, code, null);
      } else {
        const result = await handleUpdate({...userPermissions[user.username][code.code], grants: grants});
        result && handleSetPermission(user, code, result);
      }
    }
  };

  const handleAdd = async (user, code, grant) => {
    const result = await AuthorizationService.addPermission({
      grants: [grant],
      code: code.id,
      permissionType: 'User',
      reference: user.id
    });
    return result;
  }

  const handleUpdate = async (permission) => {
    const result = await AuthorizationService.updatePermission(permission.id, permission);
    return result;
  }

  const handleDelete = async (permission) => {
    try {
      const result = await AuthorizationService.deletePermission(permission.id);
      return result;
    } catch (err) {
      return null;
    }
  }

  const getPermissionChecked = (user, code, grant) => {
    const permission = userPermissions[user.username] && userPermissions[user.username][code.code];
    if (permission) {
      return permission.grants.indexOf(grant) !== -1;
    } else {
      return false;
    }
  }

  const renderPermissions = () => {
    if (selectedUser) {
      const render = codes.filter(el => el.code.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
      return (
        render.map(permission => (
          <Accordion 
            key={permission.id}
            expanded={expanded.indexOf(permission.code) !== -1}
            onChange={handleExpandSingle(permission.code)}
          >
            <AccordionSummary
              aria-controls="permission-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <div className={classes.permissionDescription}>
                <Typography>{permission.code}</Typography>
                <Typography variant='caption' gutterBottom>{permission.description}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.permissionBox}>
              <FormGroup aria-label='overrule' row key={`${permission.id}-$'overrule'`}>
                <FormControlLabel 
                  value='overrule'
                  label={<Typography variant='button'>overrule</Typography>}
                  control={<Checkbox color='secondary' checked={getPermissionChecked(selectedUser, permission, 'overrule')} />}
                  onChange={handleClick(selectedUser, permission, 'overrule')}
                  labelPlacement="start"
                />
              </FormGroup>
              {permission.grants.map(grant => (
                <FormGroup aria-label={grant} row key={`${permission.id}-${grant}`}>
                  <FormControlLabel 
                    value={grant}
                    label={<Typography variant='button'>{grant}</Typography>}
                    control={<Checkbox color='secondary' checked={getPermissionChecked(selectedUser, permission, grant)} />}
                    onChange={handleClick(selectedUser, permission, grant)}
                    labelPlacement="start"
                  />
                </FormGroup>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      );
    } else {
      return null;
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Autocomplete
          id='security-role-select'
          options={users}
          getOptionLabel={(user) => user.username}
          renderInput={(params) => <TextField {...params} label='Users' variant='outlined' />}
          onChange={(e, val) => {
            setSelectedUser(val);
          }}
          value={selectedUser}
          className={classes.selector}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper variant='outlined' className={classes.toolBar}>
          <TextField 
            id='user-permissions-search'
            label='Search'
            size='small'
            value={filter}
            onChange={handleFilterInputChange}
          />
          <Button variant='contained' color='secondary' onClick={handleExpandAll}>{expanded.length !== codes.length ? 'Expand All' : 'Collapse All'}</Button>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        { renderPermissions() }
      </Grid>
    </Grid>
  );
};

export default SecurityDetailsUserDisplay;