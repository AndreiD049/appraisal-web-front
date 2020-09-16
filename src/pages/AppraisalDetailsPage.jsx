import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {Container, makeStyles, Grid, Divider } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import InputCategory from '../widgets/InputCategory';
import ApButton from '../components/ApButton';
import AppraisalService from '../services/AppraisalService';


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
  }
}));

const AppraisalDetailsPage = ({context, ...props}) => {
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
  context.periodId = useParams()['id'];


  useEffect(() => {
    async function run() {
      const data = await AppraisalService.getItems(context);
      console.log(context);
      setPeriodDetails(data);
      setAchieved(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'Achieved'), ACHIEVED_PLANNED_MIN, 'Achieved'));
      setPlanned(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'Planned'), ACHIEVED_PLANNED_MIN, 'Planned'));
      setTraining(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'Training'), TRAINING_MIN, 'Training'));
      setTrainingSug(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'Training_Suggested'), TRAINING_MIN, 'Training_Suggested'));
      setSWOTStrength(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'SWOT_S'), SWOT_MIN, 'SWOT_S'));
      setSWOTWeakness(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'SWOT_W'), SWOT_MIN, 'SWOT_W'));
      setSWOTOpportunity(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'SWOT_O'), SWOT_MIN, 'SWOT_O'));
      setSWOTThreat(AppraisalService.normalizeSet(context, data.items.filter(el => el.type === 'SWOT_T'), SWOT_MIN, 'SWOT_T'));
    }
    run();
  }, [context]);
  
  // Update internal state on textfield change
  const handleChange = useCallback((items, setFunc, min, propname) => (e) => {
    setFieldModified(true);
    let copy = items.slice();
    const idx = Number(e.currentTarget.getAttribute('data-index'));
    if (!isNaN(idx) && idx < copy.length) {
      copy[idx].content = e.target.value;
      setFunc(AppraisalService.normalizeSet(context, copy, min, propname));
    }
  }, [context]);
  
  // Handle the remove button press
  const removeHandler = useCallback((items, setFunc, min, propname) => async (e) => {
    try {
      e.persist();
      let copy = items.slice();
      const idx = Number(e.currentTarget.getAttribute('data-index'));
      if (!isNaN(idx) && idx < copy.length) {
        let item = copy[idx];
        if (item.id !== 0)
          await AppraisalService.deleteItem(context, copy[idx].id);
        copy.splice(idx, 1);
        setFunc(AppraisalService.normalizeSet(context, copy, min, propname));
      }
    } catch (err) {
      // TODO: display error alert
    }
  }, [context]);
  
  // Update/Insert/Remove item after user leaves the text field
  const handleBlur = useCallback((items, setFunc, min, propname) => async (e) => {
    e.persist();
    const idx = AppraisalService.getIndex(context, e.currentTarget);
    if (idx < items.length) {
      let item = items[idx];
      if (item.id === 0 && item.content !== '') {
        // if item is new and we have content, add it to database
        const result = await AppraisalService.addItemToSet(context, items, item, idx);
        setFunc(AppraisalService.normalizeSet(context, result, min, propname));
      } else if (item.id !== 0 && item.content === '') {
        // item is not new, but we removed the content, try to remove it
        const result = await AppraisalService.deleteItemFromSet(context, items, item, idx);
        setFunc(AppraisalService.normalizeSet(context, result, min, propname));
      } else if (item.id !== 0 && item.content !== '' && fieldModified) {
        // item is not new, and it was updated, update it in database
        const result = await AppraisalService.updateItemInSet(context, items, item, idx);
        setFunc(AppraisalService.normalizeSet(context, result, min, propname));
      }
      // unset modified flag
      setFieldModified(false);
    }
  }, [context, fieldModified]);

  const handleFinishPeriod = useCallback(async (e) => {
    e.persist();
    await AppraisalService.finishPeriod(context, context.periodId);
  }, [context]);
  
  const achievedMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={achieved} 
        min={ACHIEVED_PLANNED_MIN}
        label={'Achieved'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setAchieved}
      />
      );
  }, [achieved, context, handleChange, handleBlur, removeHandler]);
    
  const plannedMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={planned} 
        min={ACHIEVED_PLANNED_MIN}
        label={'Planned'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setPlanned}
      />
      );
  }, [planned, context, handleBlur, handleChange, removeHandler]);
      
  const trainingMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={training} 
        min={TRAINING_MIN}
        label={'Training'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setTraining}
      />
      );
  }, [training, context, handleBlur, handleChange, removeHandler]);
    
  const trainingSugMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={trainingSug} 
        min={TRAINING_MIN}
        label={'Suggested Trainings'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setTrainingSug}
      />
      );
  }, [trainingSug, context, handleBlur, handleChange, removeHandler]);
      
  const SSMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={SWOTStrength} 
        min={SWOT_MIN}
        label={'Strength'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTStrength}
      />
      );
  }, [SWOTStrength, context, handleBlur, handleChange, removeHandler]);
        
  const SWMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={SWOTWeakness} 
        min={SWOT_MIN}
        label={'Weakness'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTWeakness}
      />
      );
  }, [SWOTWeakness, context, handleBlur, handleChange, removeHandler]);
        
  const SOMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={SWOTOpportunity} 
        min={SWOT_MIN}
        label={'Opportunity'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTOpportunity}
      />
      );
  }, [SWOTOpportunity, context, handleBlur, handleChange, removeHandler]);
          
  const STMemo = useMemo(() => {
    return (
      <InputCategory 
        context={context}
        items={SWOTThreat} 
        min={SWOT_MIN}
        label={'Threat'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRemove={removeHandler}
        setFunc={setSWOTThreat}
      />
      );
  }, [SWOTThreat, context, handleBlur, handleChange, removeHandler]);

  return (
    <Container maxWidth='md'>
      <h1 className={classes.header}>Details {periodDetails.name ? `'${periodDetails.name}'` : null}</h1>
      <Grid container>
        {/* Achieved items */}
        <Grid item xs={12} sm={6}>
          {achievedMemo}
        </Grid>
        
        <Grid item xs={12} sm={6}>
          {plannedMemo}
        </Grid>
        
        <Grid item xs = {12}>
          <Divider/>
        </Grid>

        <Grid item xs={12} sm={6}>
          {trainingMemo}
        </Grid>
        
        <Grid item xs={12} sm={6}>
          {trainingSugMemo}
        </Grid>
        
        <Grid item xs = {12}>
          <Divider/>
        </Grid>
        
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
      
        <Grid item xs={12} className={classes.centerButton} >
          <ApButton context={context} onClick={handleFinishPeriod} variant='contained' color='primary'>
            Finish
          </ApButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppraisalDetailsPage;