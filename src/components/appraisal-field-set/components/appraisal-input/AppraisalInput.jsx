import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  IconButton,
  TextField,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Delete,
  History,
  MoreVert,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

import { useParams } from 'react-router-dom';
import useStyles from './styles';
import Validate from '../../../../services/validators/AppraisalValidators';

const AppraisalInput = ({
  item, idx, changeHandler, blurHandler, removeHandler, changeTypeHandler, canUpdate, canDelete,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState({ ...item });
  const [modified, setModified] = useState(false);
  const [itemMenuAnchorEl, setItemMenuAnchorEl] = useState(null);
  const { userId } = useParams();
  const [validations, setValidations] = useState({
    isRelated: false,
    isDeletable: false,
    isFinished: false,
    inputEditable: false,
  });
  // const isRelated = Boolean(item.relatedItemId);
  // const isDeletable = isRelated ? false : item.status === 'Active';
  // const isFinished = Boolean(item.status === 'Finished');
  // const isTrainingSuggestedAllowed = item.type === 'Training_Suggested' ? !userId : false;

  useEffect(() => {
    const isRelated = new Validate.ItemIsRelated(item).validateChain().valid;
    const isDeletable = canDelete && (new Validate.ItemIsNotRelated(item).validateChain().valid);
    const isFinished = new Validate.ItemStatus(item, 'Finished').validateChain().valid;
    const inputEditable = canUpdate
    && (new Validate.ItemInputEnabled(item, userId)
      .and(new Validate.ItemIsNotRelated(item)).validateChain().valid);
    setValidations({
      isRelated,
      isDeletable,
      isFinished,
      inputEditable,
    });
    setValue({ ...item });
  }, [item, canUpdate, canDelete, userId]);

  const handleClickUserMenu = (evt) => {
    setItemMenuAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setItemMenuAnchorEl(null);
  };

  const handleBlur = async (e) => {
    e.persist();
    await blurHandler(value, idx, modified);
    setModified(false);
  };

  const handleChange = (e) => {
    setValue({ ...item, content: e.target.value });
    changeHandler({ ...value, content: e.target.value }, idx, !modified);
    setModified(true);
  };

  const handleTypeChange = (type) => async () => {
    if (item.id !== 0) { await changeTypeHandler(item.id, type); }
    handleClose();
  };

  const handleDelete = async (e) => {
    e.persist();
    setValue({ ...item, content: '' });
    await removeHandler(value, idx);
    setModified(false);
    handleClose();
  };

  const startAdornment = (
    validations.isRelated
      ? (
        <InputAdornment position="start" className={classes.startAdornment}>
          <Tooltip title="This item was added automatically from your previous appraisals" aria-label="historical item">
            <History />
          </Tooltip>
        </InputAdornment>
      )
      : null
  );

  const endAdornment = (
    <InputAdornment position="end" className={classes.startAdornment}>
      <IconButton aria-label="menu" color="inherit" tabIndex={-1} onClick={handleClickUserMenu}>
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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem disabled={!validations.isDeletable} aria-label="delete appraisal item" onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        {
          item.type === 'Planned'
            ? (
              <MenuItem aria-label="Move item to Achieved" onClick={handleTypeChange('Achieved')}>
                <ListItemIcon>
                  <ChevronLeft fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Achieved" />
              </MenuItem>
            )
            : null
        }
        {
          item.type === 'Achieved'
            ? (
              <MenuItem aria-label="move item to Planned" onClick={handleTypeChange('Planned')}>
                <ListItemIcon>
                  <ChevronRight fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Planned" />
              </MenuItem>
            )
            : null
        }
      </Menu>
    </InputAdornment>
  );

  return (
    <TextField
      className={classes.root}
      id={`app-item-${item.type.toLowerCase()}-${idx}`}
      value={value.content}
      size="small"
      variant="outlined"
      multiline
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={!validations.inputEditable}
      InputProps={{
        startAdornment,
        endAdornment: (canUpdate || canDelete) ? endAdornment : null,
      }}
    />
  );
};

AppraisalInput.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    relatedItemId: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  changeTypeHandler: PropTypes.func.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default AppraisalInput;
