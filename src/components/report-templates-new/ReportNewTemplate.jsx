import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Container,
} from '@material-ui/core';
import React, { useState } from 'react';
import AggregationStep from './components/AggregationStep';
import useStyles from './styles';

const ReportTemplateNew = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

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

  const stepContents = [
    <AggregationStep advanceStep={nextStep} />,
    null,
    null,
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
      {/* <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            New Template
          </Typography>
        </Grid>
        <Grid item xs={12} component={Paper}>
          <Box p={3}>
            <form onSubmit={() => alert('submit')}>
              <Grid container className={classes.formContainer}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    label="Template Name"
                    id="new-template-name"
                    name="new-template-name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <UploadFileComponent label="Template File" />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Aggregation
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default ReportTemplateNew;
