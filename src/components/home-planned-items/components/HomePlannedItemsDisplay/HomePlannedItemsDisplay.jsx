import React from 'react';
import {
	List,
	ListItem,
	Checkbox,
	Grid,
	FormControlLabel,
	Box,
	TextField,
	Button,
	ListItemSecondaryAction,
	IconButton
} from '@material-ui/core'
import {
	Clear
} from '@material-ui/icons'
import { useState } from 'react';
import clsx from 'clsx';
import useStyles from './styles'
import AppraisalService from '../../../../services/AppraisalService';

const HomePlannedItemsDisplay = ({ items, setItems, ...props }) => {
	const classes = useStyles();
	const [newItemVal, setNewItemVal] = useState('');
	
	const handleInputChange = (e) => {
		setNewItemVal(e.target.value);
	}

	const checkboxChangeHandler = (item) => (e) => {
		if (e.target.checked) {
			setType(item, 'Achieved');
		} else {
			setType(item, 'Planned');
		}
	}

	const setType = async (item, type) => {
		console.log(item);
		const result = await AppraisalService.updateItem({...item, type: type});
		setItems(prev => {
			const copy = {...item, type: result.type};
			return prev.map(i => i.id === item.id ? copy : i);
		});
	};

	const addItem = async (content) => {
		if (content !== '') {
			const item = {
				content: content,
				createdDate: new Date(),
				modifiedDate: new Date(),
				status: 'Active',
				type: 'Planned',
				periodId: null,
				relatedItemId: null
			}
			const result = await AppraisalService.addOrphan(item);
			setItems(prev => prev.concat(result));
			setNewItemVal('');
		}
	}

	const removeItem = async (item) => {
		await AppraisalService.deleteItem(item.id);
		setItems(prev => prev.filter(i => i.id !== item.id));
	}
	
	return (
		<Box border={1} borderColor='secondary.main' borderRadius={3} p={3}>
			<List>
				{
					items.map(item => (
						<ListItem dense>
							<FormControlLabel 
								className={clsx({
									[classes.itemAchievedText]: item.type === 'Achieved'
								})}
								control={<Checkbox name={item.content} checked={item.type === 'Achieved'} onChange={ checkboxChangeHandler(item) } />}
								label={item.content}
							/>
							<ListItemSecondaryAction>
								<IconButton disabled={item.relatedItemId !== null} onClick={(e) => removeItem(item)}>
									<Clear/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						))
					}
				</List>
			<Grid container className={classes.grid}>
				<Grid item xs={6}>
					<TextField className={classes.addInput} variant='filled' size='small' label='Add New' color='secondary' value={newItemVal} onChange={handleInputChange} />
				</Grid>
				<Grid item xs={6}>
					<Button variant='contained' color='secondary' disabled={newItemVal === ''} onClick={(e) => addItem(newItemVal)} >Add</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
		
export default HomePlannedItemsDisplay;