import React, { useState } from 'react';
import DialogDisplay from './components/dialog-display';
import DialogInfo from './components/dialog-info';
import AppraisalService from '../../services/AppraisalService';

const NewPeriodDialog = ({
    context, 
    open,
    handleClose,
    ...props
  }) => {
  const [organizations, setOrganizations] = useState([]);
  const selectValues = [
    'Active',
    'Finished'
  ];
  const handleSubmit = async (name, status, org) => {
    await AppraisalService.addPeriod({ name, status, organizationId: org, createdUser: context.user.id });
  }

  return (
    <>
      <DialogInfo setOrganizations={setOrganizations}/>
      <DialogDisplay
        open={open}
        organizations={organizations}
        selectValues={selectValues}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </>
  );
};

export default NewPeriodDialog;