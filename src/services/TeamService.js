import axios from 'axios';
import NotificationService from './NotificationService';

const TeamService = {
  getTeamsPath: `/api/teams/`,
  addTeamPath: `/api/teams`,

  validate: function(team) {
    if (!team)
      throw new Error("Team name missing");
    return true;
  },

  getTeams: async function() {
    try {
      const response = await axios.get(this.getTeamsPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`)
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  addTeam: async function(team) {
    try {
      this.validate(team);
      const response = await axios.post(this.addTeamPath, {team});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  }
};

export default TeamService;