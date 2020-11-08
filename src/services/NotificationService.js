let nextId = 0;

const getNextId = () => {
  if (nextId > 100000) {
    nextId = 0;
  }
  nextId += 1;
  return nextId;
};

const NotificationService = {
  notifications: [],
  setNotifications(func) {
    this.notifications = func(this.notifications);
  },
  addNotification(notification) { 
    this.setNotifications((prev) => {
      const n = notification;
      const copy = prev.slice();
      n.id = getNextId();
      copy.push(n);
      return copy;
    });
  },
  notify(notification) {
    this.addNotification(notification);
  },
};

export default NotificationService;
