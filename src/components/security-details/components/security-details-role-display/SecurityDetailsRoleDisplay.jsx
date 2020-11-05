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

const SecurityDetailsRoleDisplay = ({codes, roles, rolePermissions, setRolePermissions, selectedRole, setSelectedRole, ...props}) => {
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

  const handleSetPermission = (role, code, permission) => {
    setRolePermissions(prev => ({
      ...prev, 
      [role.name]: {
        ...prev[role.name],
        [code.code]: permission
      }
    }))
  }

  const handleClick = (role, code, grant) => async (e) => {
    e.persist();
    // check if it's a new permission
    if (!rolePermissions[role.name] || !rolePermissions[role.name][code.code]) {
      const result = await handleAdd(role, code, grant);
      result && handleSetPermission(role, code, result);
    } else if (e.target.checked) {
      // add a grant
      const grants = [...rolePermissions[role.name][code.code].grants, grant];
      const result = await handleUpdate({...rolePermissions[role.name][code.code], grants: grants});
      result && handleSetPermission(role, code, result);
    } else if (!e.target.checked) {
      const grants = rolePermissions[role.name][code.code].grants.filter(g => g !== grant);
      if (grants.length === 0) {
        await handleDelete(rolePermissions[role.name][code.code]);
        handleSetPermission(role, code, null);
      } else {
        const result = await handleUpdate({...rolePermissions[role.name][code.code], grants: grants});
        result && handleSetPermission(role, code, result);
      }
    }
  };

  const handleAdd = async (role, code, grant) => {
    const result = await AuthorizationService.addPermission({
      grants: [grant],
      code: code.id,
      permissionType: 'Role',
      reference: role.id
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

  const getPermissionChecked = (role, code, grant) => {
    const permission = rolePermissions[role.name] && rolePermissions[role.name][code.code];
    if (permission) {
      return permission.grants.indexOf(grant) !== -1;
    } else {
      return false;
    }
  }

  const renderPermissions = () => {
    if (selectedRole) {
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
                <Typography variant="caption" gutterBottom>{permission.description}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.permissionBox}>
              {permission.grants.map(grant => (
                <FormGroup aria-label={grant} row key={`${permission.id}-${grant}`}>
                  <FormControlLabel 
                    value={grant}
                    label={<Typography variant='button'>{grant}</Typography>}
                    control={<Checkbox color='secondary' checked={getPermissionChecked(selectedRole, permission, grant)} />}
                    onChange={handleClick(selectedRole, permission, grant)}
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
          options={roles}
          getOptionLabel={(role) => role.name}
          renderInput={(params) => <TextField {...params} label='Roles' variant='outlined' />}
          onChange={(e, val) => {
            setSelectedRole(val);
          }}
          value={selectedRole}
          className={classes.selector}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper variant='outlined' className={classes.toolBar}>
          <TextField 
            id='role-permissions-search'
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

export default SecurityDetailsRoleDisplay;