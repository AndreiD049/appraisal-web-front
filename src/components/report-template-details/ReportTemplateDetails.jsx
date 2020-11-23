import React from 'react';
import {
  Container,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

const ReportTemplateDetails = () => {
  const { id } = useParams();
  return (
    <Container maxWidth="lg">
      <h1 style={{ textAlign: 'center' }}>Details</h1>
      {' '}
      {id}
    </Container>
  );
};

export default ReportTemplateDetails;
