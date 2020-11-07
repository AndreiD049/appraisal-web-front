import React from 'react';
import PropTypes from 'prop-types';
import DialogDisplay from './components/dialog-display';
import AppraisalService from '../../services/AppraisalService';
import NotificationService from '../../services/NotificationService';

const NewPeriodDialog = ({
  context,
  open,
  handleClose,
  setItems,
}) => {
  const selectValues = [
    'Active',
    'Finished',
  ];
  const handleSubmit = async (name, status, org) => {
    const result = await AppraisalService.addPeriod({
      name, status, organizationId: org, createdUser: context.user.id,
    });
    setItems((prev) => prev.slice().concat(result));
    handleClose();
    NotificationService.notify({
      type: 'success',
      header: 'Created',
      content: `Period '${name}' created`,
    });
  };

  return (
    <>
      <DialogDisplay
        open={open}
        selectValues={selectValues}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </>
  );
};

NewPeriodDialog.propTypes = {
  context: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
};

export default NewPeriodDialog;
