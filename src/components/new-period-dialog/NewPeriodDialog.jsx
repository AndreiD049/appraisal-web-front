import React, { useState } from 'react';
import DialogDisplay from './components/dialog-display';
import DialogInfo from './components/dialog-info';
import AppraisalService from '../../services/AppraisalService';
import NotificationService from '../../services/NotificationService';

const NewPeriodDialog = ({
    context, 
    open,
    handleClose,
    setItems,
    ...props
  }) => {
  const [organizations, setOrganizations] = useState([]);
  const selectValues = [
    'Active',
    'Finished'
  ];
  const handleSubmit = async (name, status, org) => {
    const result = await AppraisalService.addPeriod({ name, status, organizationId: org, createdUser: context.user.id });
    setItems(prev => prev.slice().concat(result));
    handleClose();
    NotificationService.notify({
      type: 'success',
      header: 'Created',
      content: `Period '${name}' created`
    });
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