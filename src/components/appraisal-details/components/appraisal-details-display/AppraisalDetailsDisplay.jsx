import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Lock } from '@material-ui/icons';
import {
  Container, makeStyles, Grid, Paper, Chip, Avatar, Typography,
} from '@material-ui/core';
import FieldSet from '../../../appraisal-field-set';
import AppraisalUserRedirect from '../../../appraisal-user-redirect';
import AuthorizationComponent from '../../../shared/authorization-component';
import { validate } from '../../../../services/validators';

const userStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  middleFlex: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  border: {
    border: '1px solid black',
  },
  listItem: {
    justifyContent: 'center',
  },
  centerButton: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10, 0),
  },
  inputBlock: {
    padding: theme.spacing(4),
  },
  topMargin: {
    marginTop: theme.spacing(4),
  },
  conatiner: {
    '& > *:last-child': {
      marginBottom: theme.spacing(5),
    },
  },
  userInput: {
    width: '50%',
  },
}));

const AppraisalDetailsDisplay = ({ context, periodDetails }) => {
  const classes = userStyles();
  const [achieved, setAchieved] = useState(periodDetails.items.filter((el) => el.type === 'Achieved'));
  const [planned, setPlanned] = useState(periodDetails.items.filter((el) => el.type === 'Planned'));
  const [trainingPlanned, setTrainingPlanned] = useState(periodDetails.items.filter((el) => el.type === 'Training_Planned'));
  const [trainingAchieved, setTrainingAchieved] = useState(periodDetails.items.filter((el) => el.type === 'Training_Achieved'));
  const [swotS, setSWOTS] = useState(periodDetails.items.filter((el) => el.type === 'SWOT_S'));
  const [swotW, setSWOTW] = useState(periodDetails.items.filter((el) => el.type === 'SWOT_W'));
  const [swotO, setSWOTO] = useState(periodDetails.items.filter((el) => el.type === 'SWOT_O'));
  const [swotT, setSWOTT] = useState(periodDetails.items.filter((el) => el.type === 'SWOT_T'));
  const [feedBack, setFeedBack] = useState(periodDetails.items.filter((el) => el.type === 'Feedback'));
  const [locked, setLocked] = useState(false);
  const { user } = context;

  useEffect(() => {
    let mounted = true;
    async function run() {
      const isLocked = (await validate.periodLocked(periodDetails, user.id)()).result;
      if (mounted) {
        setLocked(isLocked);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [periodDetails, user.id]);

  return (
    <Container maxWidth="md" className={classes.conatiner}>
      <Typography variant="h4" className={classes.header}>
        Details
        {periodDetails.name ? ` '${periodDetails.name}'` : null}
      </Typography>
      <Grid container>
        <AuthorizationComponent code="APPRAISAL DETAILS - OTHER USERS" grant="read">
          <Grid item xs={12} className={classes.middleFlex}>
            <AppraisalUserRedirect className={classes.userInput} />
          </Grid>
        </AuthorizationComponent>
        <Grid item xs={12} className={classes.middleFlex}>
          {user
            ? (
              <Chip
                avatar={<Avatar />}
                label={user.username}
                color="secondary"
              />
            )
            : null}
        </Grid>
        <Grid item xs={12} className={classes.middleFlex}>
          {
            locked
              ? (
                <Chip
                  icon={<Lock />}
                  label="Locked"
                  color="text-secondary"
                />
              )
              : null
          }
        </Grid>
        <Grid container item xs={12} component={Paper} className={classes.inputBlock}>
          <Grid item xs={12}>
            <Typography className={classes.middleFlex} variant="h6">Objectives</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={achieved} setItems={setAchieved} type="Achieved" setOtherItems={setPlanned} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={planned} setItems={setPlanned} type="Planned" setOtherItems={setAchieved} />
          </Grid>
        </Grid>

        <Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
          <Grid item xs={12}>
            <Typography className={classes.middleFlex} variant="h6" align="center">Trainings</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={trainingAchieved} setItems={setTrainingAchieved} type="Training_Achieved" setOtherItems={setTrainingPlanned} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={trainingPlanned} setItems={setTrainingPlanned} type="Training_Planned" setOtherItems={setTrainingAchieved} />
          </Grid>
        </Grid>

        <Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={swotS} setItems={setSWOTS} type="SWOT_S" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={swotW} setItems={setSWOTW} type="SWOT_W" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={swotO} setItems={setSWOTO} type="SWOT_O" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FieldSet context={context} details={periodDetails} items={swotT} setItems={setSWOTT} type="SWOT_T" />
          </Grid>
        </Grid>

        <Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
          <Grid item xs={12}>
            <FieldSet context={context} details={periodDetails} items={feedBack} setItems={setFeedBack} type="Feedback" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

AppraisalDetailsDisplay.propTypes = {
  context: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      avatar: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  periodDetails: PropTypes.shape({
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
    })),
  }).isRequired,
};

export default AppraisalDetailsDisplay;
