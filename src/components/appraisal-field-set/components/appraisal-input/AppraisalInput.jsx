import React, { useState } from 'react';
import { 
  InputAdornment, 
  IconButton, 
  TextField, 
  Tooltip, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText 
} from '@material-ui/core';
import { 
  Delete,
  History,
  MoreVert,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import { useEffect } from 'react';
import useStyles from './styles';
import { useParams } from 'react-router-dom';

const AppraisalInput = ({item, idx, label, changeHandler, blurHandler, removeHandler, changeTypeHandler, canUpdate, canDelete }) => {
  const classes = useStyles();
  const [value, setValue] = useState({...item});
  const [modified, setModified] = useState(false);
  const [itemMenuAnchorEl, setItemMenuAnchorEl] = useState(null);
  const isRelated = Boolean(item.relatedItemId);
  const isDeletable = Boolean(isRelated) ? false : item.status === 'Active' ;
  const isFinished = Boolean(item.status === 'Finished');
  const userId = useParams()['userId'];
  const isTrainingSuggestedAllowed = Boolean(item.type === 'Training_Suggested') ? !Boolean(userId) : false;

  useEffect(() => {
    setValue({...item});
  }, [item]);

  const handleClickUserMenu = (evt) => {
      setItemMenuAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setItemMenuAnchorEl(null);
  }

  const handleBlur = async (e) => {
    e.persist();
    await blurHandler(value, idx, modified);
    setModified(false);
  }

  const handleChange = (e) => {
    setValue({...item, content: e.target.value});
    changeHandler({...value, content: e.target.value}, idx, !modified);
    setModified(true);
  }

  const handleTypeChange = (type) => async (e) => {
    if (item.id !== 0)
      await changeTypeHandler(item.id, type)
    handleClose();
  }

  const handleDelete = async (e) => {
    e.persist();
    setValue({...item, content: ''});
    await removeHandler(value, idx);
    setModified(false);
    handleClose();
  }

  const startAdornment = (
      isRelated ?
      (
        <InputAdornment position='start' className={classes.startAdornment}>
          <Tooltip title='This item was added automatically from your previous appraisals' aria-label='historical item'>
            <History/>
          </Tooltip>
        </InputAdornment>
      ) : 
      null
  );

  const endAdornment = (
    <InputAdornment position='end' className={classes.startAdornment}>
      <IconButton aria-label='menu' color='inherit' tabIndex={-1} onClick={handleClickUserMenu}>
          <MoreVert />
      </IconButton>
      <Menu 
          id={`item-menu-${item.id}-${idx}`}  
          anchorEl={itemMenuAnchorEl}
          keepMounted
          open={Boolean(itemMenuAnchorEl)}
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
        <MenuItem disabled={canDelete ? !isDeletable : true} aria-label='delete appraisal item' onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize='small'/>
          </ListItemIcon>
          <ListItemText primary='Delete'/>
        </MenuItem>
        {
          item.type === 'Planned' ? 
          (
            <MenuItem aria-label='Move item to Achieved' onClick={handleTypeChange('Achieved')}>
              <ListItemIcon>
                <ChevronLeft fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary='Achieved'/>
            </MenuItem>
          ) :
          null
        }
        {
          item.type === 'Achieved' ? 
          (
            <MenuItem aria-label='move item to Planned' onClick={handleTypeChange('Planned')}>
              <ListItemIcon>
                <ChevronRight fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary='Planned'/>
            </MenuItem>
          ) :
          null
        }
      </Menu>
    </InputAdornment>
  );

  return (
        <TextField 
          className={classes.root}
          id={`app-item-${item.type.toLowerCase()}-${idx}`} 
          value={value.content} 
          size='small'
          variant='outlined'
          multiline
          onChange={handleChange} 
          onBlur={ handleBlur } 
          disabled={canUpdate ? (isRelated || isFinished || isTrainingSuggestedAllowed) : true}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: isFinished ? null : endAdornment,
          }}
        />
  );
};

export default AppraisalInput;