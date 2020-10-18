import React from 'react';
import { Container, makeStyles, Grid, Paper } from '@material-ui/core';
import FieldSet from '../../../appraisal-field-set';
import AppraisalUserRedirect from '../../../appraisal-user-redirect';

const userStyles = makeStyles((theme) => ({
	header: {
		textAlign: 'center'
	},
	border: {
		border: '1px solid black'
	},
	listItem: {
		justifyContent: 'center',
	},
	centerButton: {
		display: 'flex',
		justifyContent: 'center',
		margin: theme.spacing(10, 0)
	},
	inputBlock: {
		padding: theme.spacing(4)
	},
	topMargin: {
		marginTop: theme.spacing(4)
	},
	conatiner: {
		"& > *:last-child": {
			marginBottom: theme.spacing(5),
		}
	},
	userInput: {
		width: '50%',
		margin: '2em auto'
	}
}));

const AppraisalUserDetails = ({ context, periodDetails, userDetails }) => {
  const classes = userStyles();

	return (
		<Container maxWidth='md' className={classes.conatiner}>
			<h1 className={classes.header}>Details {periodDetails.name ? `'${periodDetails.name}'` : null}</h1>
			<Grid container>
				<Grid item xs={12}>
					<AppraisalUserRedirect defaultValue={userDetails} className={classes.userInput} />
				</Grid>
				<Grid container item xs={12} component={Paper} className={classes.inputBlock}>
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'Achieved')} type='Achieved' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'Planned')} type='Planned' />
					</Grid>
				</Grid>
				
				<Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'Training')} type='Training' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'Training_Suggested')} type='Training_Suggested' />
					</Grid>
				</Grid>
				
				<Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'SWOT_S')} type='SWOT_S' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'SWOT_W')} type='SWOT_W' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'SWOT_O')} type='SWOT_O' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} _items={periodDetails.items.filter(el => el.type === 'SWOT_T')} type='SWOT_T' />
					</Grid>
				</Grid>
				
				{/* <Grid item xs={12} className={classes.centerButton} >
				<Button onClick={handleFinishPeriod} variant='contained' color='primary'>
				Finish
				</Button>
				</Grid> */}
			</Grid>
    </Container>
	);
};

export default AppraisalUserDetails;