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
  Typography,
} from '@material-ui/core';
import {
  Delete,
  Info,
  MoreVert,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

import { useParams } from 'react-router-dom';
import useStyles from './styles';
import {
  validate, perform, not, and, or,
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
    let mounted = true;
    async function run() {
      const calls = [
        perform(validate.itemRelated(item), false),
        perform(validate.itemStatus(item, 'Finished'), false),
        perform(and([
          not(validate.itemRelated(item)),
          or([
            not(validate.isTruthy(userId)),
            validate.isTruthy(userId),
          ]),
        ]), false),
      ];
      const [checkRelated, checkFinished, checkEditable] = await Promise.all(calls);
      const isRelated = checkRelated.result;
      const isFinished = checkFinished.result;
      const inputEditable = (canInsert || canUpdate)
      && checkEditable.result;
      const isDeletable = canDelete && !isRelated;
      if (mounted) {
        setValidations({
          isRelated,
          isDeletable,
          isFinished,
          inputEditable,
        });
      }
    }
    setValue({ ...item });
    run();
    return () => {
      mounted = false;
    };
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

  const tooltip = (
    <>
      {
        validations.isRelated
          ? (
            <Typography variant="caption">
              This item was added automatically from your previous appraisals
              <br />
            </Typography>
          )
          : null
      }
      <Typography variant="caption">
        <strong>Created user:</strong>
        {' '}
        {item.createdUser && item.createdUser.username}
      </Typography>
      <br />
      <Typography variant="caption">
        <strong>Created date:</strong>
        {' '}
        {item.createdDate && new Date(item.createdDate).toLocaleString()}
      </Typography>
      {
        item.modifiedUser
          ? (
            <>
              <br />
              <Typography variant="caption">
                <strong>Modified user:</strong>
                {' '}
                {item.modifiedUser && item.modifiedUser.username}
              </Typography>
            </>
          )
          : null
      }
      {
        item.modifiedUser
          ? (
            <>
              <br />
              <Typography variant="caption">
                <strong>Modified date:</strong>
                {' '}
                {item.modifiedDate && new Date(item.modifiedDate).toLocaleString()}
              </Typography>
            </>
          )
          : null
      }
    </>
  );

  const startAdornment = (
    item.id !== 0
      ? (
        <InputAdornment position="start" className={classes.startAdornment}>
          <Tooltip
            title={tooltip}
            enterDelay={500}
            disableHoverListener={item.id === 0}
            disableFocusListener
            aria-label="historical item"
          >
            <Info />
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
          item.type.indexOf('Planned') !== -1
            ? (
              <MenuItem aria-label="Move item to Achieved" onClick={handleTypeChange(item.type.replace('Planned', 'Achieved'))}>
                <ListItemIcon>
                  <ChevronLeft fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Achieved" />
              </MenuItem>
            )
            : null
        }
        {
          item.type.indexOf('Achieved') !== -1
            ? (
              <MenuItem aria-label="move item to Planned" onClick={handleTypeChange(item.type.replace('Achieved', 'Planned'))}>
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
    createdUser: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    createdDate: PropTypes.string,
    modifiedUser: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    modifiedDate: PropTypes.string,
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
