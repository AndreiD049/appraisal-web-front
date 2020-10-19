import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import AppraisalDetails from '../../components/appraisal-details';
import LoginRequired from '../../components/shared/login-required';
import GlobalContext from '../../services/GlobalContext';
import AuthorizationRedirectComponent from '../../components/shared/authorization-redirect-component'
import { SECURITY_APPRAISAL_DETAILS } from '../../utils/constants';

const AppraisalDetailsPage = (props) => {
  const global = useContext(GlobalContext);
  return (
    <Container maxWidth='md'>
      <LoginRequired/>
      <AuthorizationRedirectComponent 
        code={SECURITY_APPRAISAL_DETAILS} 
        grant='read' 
        to='/appraisals'
        failureNotification={{
          type: 'info',
          header: 'No access',
          content: 'You have no access to this page. Please contact your administrator',
        }} >
        <AppraisalDetails context={global.context} />
      </AuthorizationRedirectComponent>
    </Container>
  );
};

export default AppraisalDetailsPage;