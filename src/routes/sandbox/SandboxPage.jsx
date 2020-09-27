import React from 'react';
import TeamMatesAutocomplete from '../../widgets/TeamMatesAutocomplete';

const SandboxPage = ({ onUserSelect }) => {
    return (
        <>
            <h1>Sandbox</h1>
            <TeamMatesAutocomplete onUserSelect={(u) => console.log(u)}/>
        </>
    );
};

export default SandboxPage;