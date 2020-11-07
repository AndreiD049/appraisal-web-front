let nextId = 0;

const getNextId = () => {
  if (nextId > 100000) {
    nextId = 0;
  }
  nextId += 1;
  return nextId;
};
const NotificationContextObject = (notifications, setNotifications) => ({
  notifications,
  setNotifications,
  addNotification: (notification) => setNotifications((prev) => {
    const n = notification;
    const copy = prev.slice();
    n.id = getNextId();
    copy.push(n);
    return copy;
  }),
});

const NotificationService = {
  notificationObject: {
    addNotification: (notification) => {
      // eslint-disable-next-line no-console
      console.log(notification);
    },
  },
  notify(notification) {
    this.notificationObject.addNotification(notification);
  },
};

export {
  NotificationContextObject,
};

export default NotificationService;
