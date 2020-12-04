import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Container,
} from '@material-ui/core';
import { downloadBlob } from 'download.js';
import React, { useState } from 'react';
import ReportingService from '../../services/ReportingService';
import AddTemplateStep from './components/AddTemplateStep';
import AggregationStep from './components/AggregationStep';
import TryOutStep from './components/TryOutStep';
import useStyles from './styles';

const ReportTemplateNew = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [aggregation, setAggregation] = useState('');
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const stepLabels = [
    'Create your database aggregation',
    'Add you template file',
    'Try it out',
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % stepLabels.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => ((prev > 0) ? prev - 1 : 0));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('aggregation', aggregation);
    formData.append('name', name);
    formData.append('template', selectedFile);

    await ReportingService.createTemplate(formData);
  };

  const handleGenerate = async () => {
    const formData = new FormData();
    formData.append('aggregation', aggregation);
    formData.append('name', name);
    formData.append('template', selectedFile);

    const result = await ReportingService.generateTemplate(formData);
    console.log(result);
    await downloadBlob('report.xlsx', result);
  };

  const stepContents = [
    <AggregationStep
      advanceStep={nextStep}
      value={aggregation}
      setValue={setAggregation}
      setAggregation={setAggregation}
    />,
    <AddTemplateStep
      name={name}
      setName={setName}
      file={selectedFile}
      setFile={setSelectedFile}
      advanceStep={nextStep}
      prevStep={prevStep}
    />,
    <TryOutStep
      prevStep={prevStep}
      handleSubmit={handleSubmit}
      handleGenerate={handleGenerate}
    />,
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" className={classes.header}>
          New Template
        </Typography>
        <Stepper elevation={2} activeStep={activeStep} orientation="vertical">
          {stepLabels.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {stepContents[index]}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Container>
    </div>
  );
};

export default ReportTemplateNew;
