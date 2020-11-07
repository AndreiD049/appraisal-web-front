import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import TeamMatesAutocomplete from '../shared/team-mates-autocomplete';

const AppraisalUserRedirect = ({ defaultValue, className }) => {
  const { id } = useParams();
  const history = useHistory();
  const [selectedUser, setSelectedUser] = useState(defaultValue || null);

  const handleSelect = useCallback((user) => {
    if (user) return history.push(`/appraisals/${id}/user/${user.id}`);
    return setSelectedUser(user);
  }, [history, id]);

  return (
    <>
      <TeamMatesAutocomplete
        value={selectedUser}
        onUserSelect={(user) => handleSelect(user)}
        className={className}
        defaultValue={defaultValue}
      />
    </>
  );
};

AppraisalUserRedirect.propTypes = {
  defaultValue: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
};

AppraisalUserRedirect.defaultProps = {
  defaultValue: null,
};

export default AppraisalUserRedirect;
