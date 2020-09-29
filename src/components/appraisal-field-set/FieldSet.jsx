import React, { useState, useCallback } from 'react';
import { makeStyles, Box, List, ListItem } from '@material-ui/core';
import AppraisalInput from './components/appraisal-input';
import AppraisalService from '../../services/AppraisalService';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
	header: {
		textAlign: 'center'
	},
	border: {
		border: '1px solid black'
	},
	listItem: {
		justifyContent: 'center',
		padding: 0
	}
});

const FieldSet = ({context, _items, details, type}) => {
	const min_items = {
		'Achieved': 5,
		'Planned': 5,
		'Training': 3,
		'Training_Suggested': 3,
		'SWOT_S': 5,
		'SWOT_W': 5,
		'SWOT_O': 5,
		'SWOT_T': 5
	};
	
	const labels = {
		'Achieved': 'Achieved',
		'Planned': 'Planned',
		'Training': 'Trainings',
		'Training_Suggested': 'Training_Suggested',
		'SWOT_S': 'Strengths',
		'SWOT_W': 'Weaknesses',
		'SWOT_O': 'Opportunities',
		'SWOT_T': 'Threats'
	}
	const periodId = details.id;
	const [items, setItems] = useState(AppraisalService.normalizeSet(periodId, context.user, _items, min_items[type], type, details));
	const classes = useStyles();
	const min = min_items[type] || 0;
	const userId = useParams()['userId'];

	// CRUD functions
	const addItem = useCallback(async (periodId, item) => {
		if (!userId) {
			return AppraisalService.addItemToSet(periodId, item);
		} else {
			return AppraisalService.addUserItemToSet(periodId, userId, item);
		}
	}, [userId]);

	const updateItem = useCallback(async (periodId, item) => {
		if (!userId) {
			return AppraisalService.updateItemInSet(periodId, item);
		} else {
			return AppraisalService.updateUserItemInSet(periodId, userId, item);
		}
	}, [userId]);

	const deleteItem = useCallback(async (periodId, item) => {
	 if (!userId) {
			return AppraisalService.deleteItemFromSet(periodId, item);
	 } else {
			return AppraisalService.deleteUserItemFromSet(periodId, userId, item);
	 }
	}, [userId]);

	useEffect(() => {
		setItems(AppraisalService.normalizeSet(periodId, context.user, _items, min_items[type], type, details));
	// eslint-disable-next-line
	}, [context.user, details]);
	
	const changeHandler = useCallback((item, idx, firstChange) => {
		if (firstChange) {
			setItems(prev => {
				let copy = prev.slice();
				copy[idx].content = item.content;
				return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
			})
		}
	}, [context.user, details, periodId, type, min]);
	
	// Handle the remove button press
	const removeHandler = useCallback(async (item, idx) => {
		try {
			if (!isNaN(idx) && idx < items.length) {
				if (item.id !== 0)
					await AppraisalService.deleteItem(periodId, items[idx].id);
				setItems(prev => {
					let copy = prev.filter(i => i.id !== item.id);
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			}
		} catch (err) {
				setItems(prev => {
					let copy = prev.slice();
					copy[idx] = item;
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			// TODO: display error alert
		}
	}, [context, details, items, periodId, type, min]);
	
	/*
			Following procedure needs to syncronize the current item modification with the database
		whenever user loses focus of the input field. (Press Tab or click out).
		I receive the item that i was modifying, it's order in the group of inputs (index), and a 
		flag saiyng whether it was modified.
	 */
	const handleBlur = useCallback(async (item, idx, modified) => {
		// If the element i want to syncronize is valid, meaning it has correct order number and type.
		if (idx < items.length && item.type === type) {
			// I determine if the item is new (if it was earlier saved to the database)
			const isNew = item.id === 0 && item.content;
			// I determine if the item needs to be deleted from the database (is not new and content is empty)
			const isToBeDeleted = item.id !== 0 && item.content === '';
			if (isNew) {
				// I try to add the item to the database.
				const result = await addItem(periodId, item);
				// Depending whether the addition succeeded or not, i update the input field accordingly
				setItems(prev => {
					let copy = prev.slice();
					if (!result.error) {
						copy[idx] = result.value;
					}
					else {
						copy[idx] = item;
						copy[idx].content = '';
					}
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details)
				});
			} else if (isToBeDeleted) {
				// I try to delete the item from the database:
				const result = await deleteItem(periodId, item);
				// Depending whether the addition succeeded or not, i update the input field accordingly
				setItems(prev => {
					let copy = prev.slice();
					console.log(copy);
					if (!result.error)
						copy = copy.filter(i => i.id !== item.id);
					else
						copy[idx] = result.value
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			} else if (!isNew && !isToBeDeleted && modified) {
				// I try to modify item in the database
				const result = await updateItem(periodId, item);
				// Depending whether the addition succeeded or not, i update the input field accordingly
				setItems(prev => {
					let copy = prev.map(i => {
						if (i.id === item.id) {
							return result.value;
						} else {
							return i
						}
					});
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			}
		}
	}, [context, details, items, periodId, type, min, addItem, deleteItem, updateItem]);
	
	
	return (
		<Box>
			<h3 className={classes.header}>{labels[type]}</h3>
			<List>
				{items.map((i, idx) => (
					<ListItem className={classes.listItem} key={`${idx}`}>
						<AppraisalInput 
							item={i} 
							idx={idx} 
							label={labels[type]} 
							changeHandler={changeHandler}
							blurHandler={handleBlur}
							removeHandler={removeHandler}/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
		
export default FieldSet;