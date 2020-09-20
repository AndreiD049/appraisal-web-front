import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {Container, makeStyles, Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import InputCategory from '../widgets/InputCategory';
import ApButton from '../components/ApButton';
import AppraisalService from '../services/AppraisalService';
import LoginRequired from '../widgets/LoginRequired';


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
  }
}));

const AppraisalDetailsPage = ({ctx, setCtx, ...props}) => {
  const ACHIEVED_PLANNED_MIN = 5;
  const TRAINING_MIN = 2;
  const SWOT_MIN = 5;
  const classes = userStyles();
  const [periodDetails, setPeriodDetails] = useState({});
  const [achieved, setAchieved] = useState([]);
  const [planned, setPlanned] = useState([]);
  const [training, setTraining] = useState([]);
  const [trainingSug, setTrainingSug] = useState([]);
  const [SWOTStrength, setSWOTStrength] = useState([]);
  const [SWOTWeakness, setSWOTWeakness] = useState([]);
  const [SWOTOpportunity, setSWOTOpportunity] = useState([]);
  const [SWOTThreat, setSWOTThreat] = useState([]);
  const [fieldModified, setFieldModified] = useState(false);
  ctx.periodId = useParams()['id'];


  useEffect(() => {
    async function run() {
      const data = await AppraisalService.getItems(ctx);
      setPeriodDetails(data);
      setAchieved(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'Achieved'), ACHIEVED_PLANNED_MIN, 'Achieved', data));
      setPlanned(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'Planned'), ACHIEVED_PLANNED_MIN, 'Planned', data));
      setTraining(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'Training'), TRAINING_MIN, 'Training', data));
      setTrainingSug(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'Training_Suggested'), TRAINING_MIN, 'Training_Suggested', data));
      setSWOTStrength(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'SWOT_S'), SWOT_MIN, 'SWOT_S', data));
      setSWOTWeakness(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'SWOT_W'), SWOT_MIN, 'SWOT_W', data));
      setSWOTOpportunity(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'SWOT_O'), SWOT_MIN, 'SWOT_O', data));
      setSWOTThreat(AppraisalService.normalizeSet(ctx, data.items.filter(el => el.type === 'SWOT_T'), SWOT_MIN, 'SWOT_T', data));
    }
    run();
  }, [ctx]);
  
  // Update internal state on textfield change
  const handleChange = useCallback((items, setFunc, min, propname) => (e) => {
    setFieldModified(true);
    let copy = items.slice();
    const idx = Number(e.currentTarget.getAttribute('data-index'));
    if (!isNaN(idx) && idx < copy.length) {
      copy[idx].content = e.target.value;
      setFunc(AppraisalService.normalizeSet(ctx, copy, min, propname, periodDetails));
    }
  }, [ctx, periodDetails]);
  
  // Handle the remove button press
  const removeHandler = useCallback((items, setFunc, min, propname) => async (e) => {
    try {
      e.persist();
      let copy = items.slice();
      const idx = Number(e.currentTarget.getAttribute('data-index'));
      if (!isNaN(idx) && idx < copy.length) {
        let item = copy[idx];
        if (item.id !== 0)
          await AppraisalService.deleteItem(ctx, copy[idx].id);
        copy.splice(idx, 1);
        setFunc(AppraisalService.normalizeSet(ctx, copy, min, propname, periodDetails));
      }
    } catch (err) {
      // TODO: display error alert
    }
  }, [ctx,periodDetails]);
  
  // Update/Insert/Remove item after user leaves the text field
  const handleBlur = useCallback((items, setFunc, min, propname) => async (e) => {
    e.persist();
    const idx = AppraisalService.getIndex(ctx, e.currentTarget);
    if (idx < items.length) {
      let item = items[idx];
      if (item.id === 0 && item.content !== '') {
        // if item is new and we have content, add it to database
        const result = await AppraisalService.addItemToSet(ctx, items, item, idx);
        setFunc(AppraisalService.normalizeSet(ctx, result, min, propname, periodDetails));
      } else if (item.id !== 0 && item.content === '') {
        // item is not new, but we removed the content, try to remove it
        const result = await AppraisalService.deleteItemFromSet(ctx, items, item, idx);
        setFunc(AppraisalService.normalizeSet(ctx, result, min, propname, periodDetails));
      } else if (item.id !== 0 && item.content !== '' && fieldModified) {
        // item is not new, and it was updated, update it in database
        const result = await AppraisalService.updateItemInSet(ctx, items, item, idx);
        setFunc(AppraisalService.normalizeSet(ctx, result, min, propname, periodDetails));
      }
      // unset modified flag
      setFieldModified(false);
    }
  }, [ctx, fieldModified, periodDetails]);

  const handleFinishPeriod = useCallback(async (e) => {
    e.persist();
    await AppraisalService.finishPeriod(ctx, ctx.periodId);
  }, [ctx]);
  
  const achievedMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={achieved} 
        min={ACHIEVED_PLANNED_MIN}
        label={'Achieved'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setAchieved}
      />
      );
  }, [achieved, ctx, handleChange, handleBlur, removeHandler]);
    
  const plannedMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={planned} 
        min={ACHIEVED_PLANNED_MIN}
        label={'Planned'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setPlanned}
      />
      );
  }, [planned, ctx, handleBlur, handleChange, removeHandler]);
      
  const trainingMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={training} 
        min={TRAINING_MIN}
        label={'Training'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setTraining}
      />
      );
  }, [training, ctx, handleBlur, handleChange, removeHandler]);
    
  const trainingSugMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={trainingSug} 
        min={TRAINING_MIN}
        label={'Suggested Trainings'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setTrainingSug}
      />
      );
  }, [trainingSug, ctx, handleBlur, handleChange, removeHandler]);
      
  const SSMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={SWOTStrength} 
        min={SWOT_MIN}
        label={'Strength'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTStrength}
      />
      );
  }, [SWOTStrength, ctx, handleBlur, handleChange, removeHandler]);
        
  const SWMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={SWOTWeakness} 
        min={SWOT_MIN}
        label={'Weakness'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTWeakness}
      />
      );
  }, [SWOTWeakness, ctx, handleBlur, handleChange, removeHandler]);
        
  const SOMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={SWOTOpportunity} 
        min={SWOT_MIN}
        label={'Opportunity'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTOpportunity}
      />
      );
  }, [SWOTOpportunity, ctx, handleBlur, handleChange, removeHandler]);
          
  const STMemo = useMemo(() => {
    return (
      <InputCategory 
        ctx={ctx}
        items={SWOTThreat} 
        min={SWOT_MIN}
        label={'Threat'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTThreat}
      />
      );
  }, [SWOTThreat, ctx, handleBlur, handleChange, removeHandler]);

  return (
    <Container maxWidth='md'>
      <LoginRequired ctx={ctx} setCtx={setCtx} />
      <h1 className={classes.header}>Details {periodDetails.name ? `'${periodDetails.name}'` : null}</h1>
      <Grid container>
        <Grid container item xs={12} component={Paper} className={classes.inputBlock}>
          <Grid item xs={12} sm={6}>
            {achievedMemo}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {plannedMemo}
          </Grid>
        </Grid>

        <Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
          <Grid item xs={12} sm={6}>
            {trainingMemo}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {trainingSugMemo}
          </Grid>
        </Grid>
        
        <Grid container item xs={12} component={Paper} className={`${classes.inputBlock} ${classes.topMargin}`}>
          <Grid item xs={12} sm={6}>
            {SSMemo}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {SWMemo}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {SOMemo}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {STMemo}
          </Grid>
        </Grid>
      
        <Grid item xs={12} className={classes.centerButton} >
          <ApButton ctx={ctx} onClick={handleFinishPeriod} variant='contained' color='primary'>
            Finish
          </ApButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppraisalDetailsPage;