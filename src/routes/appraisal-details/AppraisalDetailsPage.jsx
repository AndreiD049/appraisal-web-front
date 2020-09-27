import React from 'react';
import { Container } from '@material-ui/core';
import AppraisalDetails from '../../components/appraisal-details';
import LoginRequired from '../../widgets/LoginRequired';
import GlobalContext from '../../services/GlobalContext';
import { useContext } from 'react';

const AppraisalDetailsPage = (props) => {
  const global = useContext(GlobalContext);
  return (
    <Container maxWidth='md'>
      <LoginRequired/>
      <AppraisalDetails context={global.context} />
    </Container>
  );
};

export default AppraisalDetailsPage;