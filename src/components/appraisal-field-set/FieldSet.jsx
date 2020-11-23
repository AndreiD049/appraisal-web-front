import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Box, List, ListItem,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AppraisalInput from './components/appraisal-input';
import AppraisalService from '../../services/AppraisalService';
import { validate, perform } from '../../services/validators';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
  border: {
    border: '1px solid black',
  },
  listItem: {
    justifyContent: 'center',
    padding: 0,
  },
});

const FieldSet = ({
  context,
  items,
  setItems,
  details,
  type,
  setOtherItems,
}) => {
  const minItems = {
    Achieved: 5,
    Planned: 5,
    Training_Planned: 3,
    Training_Achieved: 3,
    SWOT_S: 5,
    SWOT_W: 5,
    SWOT_O: 5,
    SWOT_T: 5,
    Feedback: 1,
  };

  const labels = {
    Achieved: 'Achieved',
    Planned: 'Planned',
    Training_Planned: 'Planned',
    Training_Achieved: 'Achieved',
    SWOT_S: 'Strengths',
    SWOT_W: 'Weaknesses',
    SWOT_O: 'Opportunities',
    SWOT_T: 'Threats',
    Feedback: 'Remarks / Other feedback',
  };
  const periodId = details.id;
  const classes = useStyles();
  const min = minItems[type] || 0;
  const [validations, setValidations] = useState({
    canInsert: false,
    canUpdate: false,
    canDelete: false,
  });
  const { userId } = useParams();
  const { user } = context;

  useEffect(() => {
    async function run() {
      // if we have no userid, we need to check if the period is locked
      let isLocked = !userId
        ? (await validate.periodLocked(details, user.id)()).result
        : false;
      const isFinished = (await validate.periodStatus(details, 'Finished')()).result;
      // Locked is false by default for finished periods
      if (isFinished) isLocked = false;
      // if period is locked, we cannot insert, update or delete items
      if (!isLocked) {
        const canInsert = (await perform(validate
          .canInsert(context, details, userId), false)).result;
        const canUpdate = (await perform(validate
          .canUpdate(context, details, userId), false)).result;
        const canDelete = (await perform(validate
          .canDelete(context, details, userId), false)).result;
        setValidations((prev) => ({
          ...prev,
          canInsert,
          canUpdate,
          canDelete,
        }));
      }
    }
    setItems(AppraisalService.normalizeSet(
      periodId,
      context.user,
      items,
      min,
      type,
    ));
    run();
    // eslint-disable-next-line
  }, []);

  // CRUD functions
  const addItem = useCallback(async (id, item) => {
    if (!userId) {
      return AppraisalService.addItemToSet(id, item);
    }
    return AppraisalService.addUserItemToSet(id, userId, item);
  }, [userId]);

  const updateItem = useCallback(async (id, item) => {
    if (!userId) {
      return AppraisalService.updateItemInSet(id, item);
    }
    return AppraisalService.updateUserItemInSet(id, userId, item);
  }, [userId]);

  const deleteItem = useCallback(async (id, item) => {
    if (!userId) {
      return AppraisalService.deleteItemFromSet(id, item);
    }
    return AppraisalService.deleteUserItemFromSet(id, userId, item);
  }, [userId]);

  const changeHandler = useCallback((item, idx, firstChange) => {
    if (firstChange) {
      setItems((prev) => {
        const copy = prev.slice();
        copy[idx].content = item.content;
        return AppraisalService.normalizeSet(
          periodId, user, copy, min, type,
        );
      });
    }
  }, [user, periodId, type, min, setItems]);

  const changeTypeHandler = useCallback(async (itemId, itemType) => {
    if (itemId !== 0 && setOtherItems) {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        item.type = itemType;
        const result = await updateItem(periodId, item);
        if (!result.error) {
          setItems((prev) => (
            AppraisalService.normalizeSet(
              periodId,
              user,
              prev.filter((i) => i.id !== result.value.id),
              min,
              itemType,
            )));
          setOtherItems((prev) => AppraisalService.normalizeSet(
            periodId,
            user,
            prev.filter((i) => i.content !== '').concat(result.value),
            min,
            itemType,
          ));
        }
      }
    }
  }, [user, setOtherItems, min, items, periodId, setItems, updateItem]);

  // Handle the remove button press
  const removeHandler = useCallback(async (item, idx) => {
    try {
      if (!Number.isNaN(idx) && idx < items.length) {
        if (item.id !== 0) {
          const result = await deleteItem(periodId, items[idx]);
          if (result.error !== null) {
            throw result.error;
          }
        }
        setItems((prev) => {
          const copy = prev.filter((i) => i.id !== item.id);
          return AppraisalService.normalizeSet(
            periodId,
            user,
            copy,
            min,
            type,
          );
        });
      }
    } catch (err) {
      setItems((prev) => {
        const copy = prev.slice();
        copy[idx] = item;
        return AppraisalService.normalizeSet(
          periodId,
          user,
          copy,
          min,
          type,
        );
      });
    }
  }, [user, items, periodId, type, min, deleteItem, setItems]);

  /*
      Following procedure needs to syncronize the current
    item modification with the database
    whenever user loses focus of the input field.
    (Press Tab or click out).
    I receive the item that i was modifying, it's order in
    the group of inputs (index), and a
    flag saiyng whether it was modified.
   */
  const blurHandler = useCallback(async (item, idx, modified) => {
    // If the element i want to syncronize is valid, meaning it has correct order number and type.
    if (idx < items.length && item.type === type) {
      // I determine if the item is new (if it was earlier saved to the database)
      const isNew = item.id === 0 && item.content;
      // I determine if the item needs to be deleted from the database
      // (is not new and content is empty)
      const isToBeDeleted = item.id !== 0 && item.content === '';
      if (isNew) {
        // I try to add the item to the database.
        const result = await addItem(periodId, item);
        // Depending whether the addition succeeded or not, i update the input field accordingly
        setItems((prev) => {
          const copy = prev.slice();
          if (!result.error) {
            copy[idx] = result.value;
          } else {
            copy[idx] = item;
            copy[idx].content = '';
          }
          return AppraisalService.normalizeSet(
            periodId,
            user,
            copy,
            min,
            type,
          );
        });
      } else if (isToBeDeleted) {
        // I try to delete the item from the database:
        const result = await deleteItem(periodId, item);
        // Depending whether the addition succeeded or not, i update the input field accordingly
        setItems((prev) => {
          let copy = prev.slice();
          if (!result.error) {
            copy = copy.filter((i) => i.id !== item.id);
          } else if (result.value) {
            copy[idx] = result.value;
          }
          return AppraisalService.normalizeSet(
            periodId,
            user,
            copy,
            min,
            type,
          );
        });
      } else if (!isNew && !isToBeDeleted && modified && item.content !== '') {
        // I try to modify item in the database
        const result = await updateItem(periodId, item);
        // Depending whether the addition succeeded or not, i update the input field accordingly
        setItems((prev) => {
          let copy;
          if (result.error) {
            copy = prev.slice();
            if (result.value) copy[idx] = result.value;
          } else {
            copy = prev.map((i) => {
              if (i.id === item.id) {
                return result.value;
              }
              return i;
            });
          }
          return AppraisalService.normalizeSet(
            periodId,
            user,
            copy,
            min,
            type,
          );
        });
      }
    }
  }, [user, items, periodId, type, min, addItem, deleteItem, updateItem, setItems]);

  return (
    <Box>
      <h3 className={classes.header}>{labels[type]}</h3>
      <List>
        {items.map((i, idx) => {
          const key = i.id === 0 ? idx : i.id;
          return (
            <ListItem className={classes.listItem} key={key}>
              <AppraisalInput
                item={i}
                idx={idx}
                label={labels[type]}
                changeHandler={changeHandler}
                blurHandler={blurHandler}
                removeHandler={removeHandler}
                changeTypeHandler={changeTypeHandler}
                canInsert={validations.canInsert}
                canUpdate={validations.canUpdate}
                canDelete={validations.canDelete}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

FieldSet.propTypes = {
  context: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
    Authorize: PropTypes.func,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setItems: PropTypes.func.isRequired,
  details: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
  setOtherItems: PropTypes.func,
};

FieldSet.defaultProps = {
  setOtherItems: null,
};

export default FieldSet;
