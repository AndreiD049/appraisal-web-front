let nextId = 0;

const getNextId = () => {
  if (nextId > 100000) {
    nextId = 0;
  }
  nextId++;
  return nextId;
}
const NotificationContextObject = (notifications, setNotifications) => {
  return {
    notifications: notifications,
    setNotifications: setNotifications,
    addNotification: (notification) => setNotifications(prev => {
      let copy = prev.slice();
      notification.id = getNextId();
      copy.push(notification);
      return copy;
    }),
  }
}

const NotificationService = {
  notificationObject: {
    addNotification: (notification) => {
      console.log(notification);
    }
  },
  notify: function (notification) {
    this.notificationObject.addNotification(notification);
  }
}

export {
  NotificationContextObject
};

export default NotificationService;