import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TeamMatesAutocomplete from '../shared/team-mates-autocomplete';
import { useCallback, useState } from 'react';

const AppraisalUserRedirect = ({defaultValue, ...props}) => {
  const id = useParams()['id'];
  const history = useHistory();
  const [selectedUser, setSelectedUser] = useState(defaultValue || null);

  const handleSelect = useCallback((user) => {
    if (user)
      return history.push(`/appraisals/${id}/user/${user.id}`);
    setSelectedUser(user);
  }, [history, id])

  return (
    <>
      <TeamMatesAutocomplete 
        value={selectedUser}
        onUserSelect={(user) => handleSelect(user)}
        {...props}
      />
    </>
  );
};

export default AppraisalUserRedirect;