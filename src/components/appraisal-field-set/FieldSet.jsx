import React, { useState, useCallback } from 'react';
import { makeStyles, Box, List, ListItem } from '@material-ui/core';
import AppraisalInput from './components/appraisal-input';
import AppraisalService from '../../services/AppraisalService';
import { useEffect } from 'react';

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
	
	useEffect(() => {
		setItems(AppraisalService.normalizeSet(periodId, context.user, _items, min_items[type], type, details));
	// eslint-disable-next-line
	}, [context.user, details]);
	
	const changeHandler = useCallback((item, idx, firstChange) => {
		if (firstChange) {
			const min = min_items[type];
			setItems(prev => {
				let copy = prev.slice();
				copy[idx].content = item.content;
				return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
			})
		}
	}, [context.user, details, min_items, periodId, type]);
	
	// Handle the remove button press
	const removeHandler = useCallback(async (item, idx) => {
		try {
			const min = min_items[type];
			if (!isNaN(idx) && idx < items.length) {
				if (item.id !== 0)
				await AppraisalService.deleteItem(periodId, items[idx].id);
				setItems(prev => {
					let copy = prev.filter(i => i.id !== item.id);
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			}
		} catch (err) {
			// TODO: display error alert
		}
	}, [context, details, items, min_items, periodId, type]);
	
	// Update/Insert/Remove item after user leaves the text field
	const handleBlur = useCallback(async (item, idx, modified) => {
		const min = min_items[type] || 0;
		if (idx < items.length) {
			if (item.id === 0 && item.content !== '') {
				// if item is new and we have content, add it to database
				const result = await AppraisalService.addItemToSet(periodId, item);
				setItems(prev => {
					let copy = prev.slice();
					if (!result.error)
						copy[idx] = result.value;
					else
						copy[idx].content = '';
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details)
				});
			} else if (item.id !== 0 && item.content === '') {
				// item is not new, but we removed the content, try to remove it
				const result = await AppraisalService.deleteItemFromSet(periodId, item);
				setItems(prev => {
					let copy = prev.slice();
					if (!result.error)
					copy = copy.filter(i => i.id !== item.id);
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			} else if (item.id !== 0 && item.content !== '' && modified) {
				// item is not new, and it was updated, update it in database
				const result = await AppraisalService.updateItemInSet(periodId, item);
				setItems(prev => {
					let copy = prev.map(i => {
						if (i.id === item.id && !result.error)
						return item;
						else 
						return i
					})
					return AppraisalService.normalizeSet(periodId, context.user, copy, min, type, details);
				});
			}
		}
	}, [context, details, items, min_items, periodId, type]);
	
	
	console.log("render", items);
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