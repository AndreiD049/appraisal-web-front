export const Context = {
  user: null,

  setUser: function(user) {
    this.user = user;
  },
  // Basic alert
  showAlert: function(type, message) {
    switch (type) {
      case 'info':
        console.log(`INFO: ${new Date()} - ${message}`)
        break;
      case 'warning':
        console.log(`WARNING: ${Date.now()} - ${message}`)
        break;
      case 'error':
        console.log(`ERROR: ${Date.now()} - ${message}`)
        break;
      default:
        console.log(`OTHER: ${Date.now()} - ${message}`)
        break;
    }
  },

  isAuth: function() {
    return this.user && this.user.id;
  }
}

export default Context;
