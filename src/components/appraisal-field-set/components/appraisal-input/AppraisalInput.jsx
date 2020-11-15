import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import {
  validate, performSync, notSync, andSync, orSync,
} from '../../../../services/validators';

const AppraisalInput = ({
  item,
  idx,
  changeHandler,
  blurHandler,
  removeHandler,
  changeTypeHandler,
  canInsert,
  canUpdate,
  canDelete,
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

  useEffect(() => {
    const isRelated = performSync(validate.itemRelated(item), false).result;
    const isDeletable = canDelete && performSync(notSync(validate.itemRelated(item)), false).result;
    const isFinished = performSync(validate.itemStatus(item, 'Finished'), false).result;
    const inputEditable = (canInsert || canUpdate)
    && performSync(andSync([
      notSync(validate.itemRelated(item)),
      orSync([
        andSync([
          notSync(validate.isTruthy(userId)),
          notSync(validate.itemType(item, 'Training_Suggested')),
        ]),
        validate.isTruthy(userId),
      ]),
    ]), false).result;
    setValidations({
      isRelated,
      isDeletable,
      isFinished,
      inputEditable,
    });
    setValue({ ...item });
  }, [item, canInsert, canUpdate, canDelete, userId]);

  const showEndAdornment = () => {
    if (item.type === 'Feedback') return false;
    return [canInsert, canUpdate, canDelete].some((e) => e);
  };

  const handleClickUserMenu = (evt) => {
    setItemMenuAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setItemMenuAnchorEl(null);
  };

  const handleBlur = async (e) => {
    e.persist();
    const mod = modified;
    setModified(false);
    await blurHandler(value, idx, mod);
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
      className={clsx(
        // classes.root,
        item.type === 'Feedback' ? classes.feedBackInput : classes.root,
      )}
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
        endAdornment: showEndAdornment() ? endAdornment : null,
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
  canInsert: PropTypes.bool.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default AppraisalInput;
