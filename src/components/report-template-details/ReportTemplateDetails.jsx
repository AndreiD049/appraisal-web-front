import React from 'react'
import {
  Container,
} from '@material-ui/core';
import { useParams } from 'react-router-dom'

const ReportTemplateDetails = (props) => {
  const id = useParams()['id'];
  return (
    <Container maxWidth='lg'>
      <h1 style={{textAlign: 'center'}}>Details</h1>
      Details {id}
    </Container>
  );
};

export default ReportTemplateDetails