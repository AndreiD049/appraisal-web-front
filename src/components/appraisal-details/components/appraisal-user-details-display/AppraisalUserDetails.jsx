import React, { useState } from 'react';
import { Container, makeStyles, Grid, Paper } from '@material-ui/core';
import FieldSet from '../../../appraisal-field-set';
import AppraisalUserRedirect from '../../../appraisal-user-redirect';
import AuthorizationComponent from '../../../shared/authorization-component';

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
	const [achieved, setAchieved] = useState(periodDetails.items.filter(el => el.type === 'Achieved'));
	const [planned, setPlanned] = useState(periodDetails.items.filter(el => el.type === 'Planned'));
	const [training, setTraining] = useState(periodDetails.items.filter(el => el.type === 'Training'));
	const [trainingSuggested, setTrainingSuggested] = useState(periodDetails.items.filter(el => el.type === 'Training_Suggested'));
	const [swot_s, setSWOT_S] = useState(periodDetails.items.filter(el => el.type === 'SWOT_S'));
	const [swot_w, setSWOT_W] = useState(periodDetails.items.filter(el => el.type === 'SWOT_W'));
	const [swot_o, setSWOT_O] = useState(periodDetails.items.filter(el => el.type === 'SWOT_O'));
	const [swot_t, setSWOT_T] = useState(periodDetails.items.filter(el => el.type === 'SWOT_T'));

	return (
		<Container maxWidth='md' className={classes.conatiner}>
			<h1 className={classes.header}>Details {periodDetails.name ? `'${periodDetails.name}'` : null}</h1>
			<Grid container>
				<AuthorizationComponent code='APPRAISAL DETAILS - OTHER USERS' grant='read'>
					<Grid item xs={12}>
						<AppraisalUserRedirect defaultValue={userDetails} className={classes.userInput} />
					</Grid>
				</AuthorizationComponent>
				<Grid container item xs={12} component={Paper} className={classes.inputBlock}>
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={achieved} setItems={setAchieved} type='Achieved' setOtherItems={setPlanned}/>
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={planned} setItems={setPlanned} type='Planned' setOtherItems={setAchieved} />
					</Grid>
				</Grid>
				
				<Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={training} setItems={setTraining} type='Training' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={trainingSuggested} setItems={setTrainingSuggested} type='Training_Suggested' />
					</Grid>
				</Grid>
				
				<Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={swot_s} setItems={setSWOT_S} type='SWOT_S' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={swot_w} setItems={setSWOT_W} type='SWOT_W' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={swot_o} setItems={setSWOT_O} type='SWOT_O' />
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<FieldSet context={context} details={periodDetails} items={swot_t} setItems={setSWOT_T} type='SWOT_T' />
					</Grid>
				</Grid>
			</Grid>
    </Container>
	);
};

export default AppraisalUserDetails;