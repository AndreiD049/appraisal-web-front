import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NotificationService from '../../../services/NotificationService';
import PopUp from '../pop-up';
import useStyles from './styles';

const NotificationContainer = ({
  entry, onAfterClose, notificationRender,
}) => {
  const classes = useStyles({ entry });
  const [closing, setClosing] = useState(false);

  return (
    <div className={clsx(classes.containerTransition, {
      [classes.containerTransitionOff]: closing,
    })}
    >
      {notificationRender(entry, {
        entry,
        onAfterClose,
        closeTimeOffset: 5,
        onBeforeClose: () => new Promise((res) => {
          setClosing(true);
          setTimeout(() => {
            res();
          }, 700);
        }),
      })}
    </div>
  );
};

NotificationContainer.propTypes = {
  entry: PropTypes.shape({
    type: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    duration: PropTypes.number,
  }).isRequired,
  notificationRender: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func.isRequired,
};

const NotificationManager = ({
  notificationRender, onAfterClose, ...props
}) => {
  const classes = useStyles(props);
  const [notifications, setNotifications] = useState([]);
  NotificationService.notifications = notifications;
  NotificationService.setNotifications = setNotifications;

  return (
    <div className={classes.root}>
      {
        notifications.map((n) => (
          <NotificationContainer
            key={n.id}
            notificationRender={(notification, props) => (
              <PopUp
                type={notification.type}
                entry={props.entry}
                onBeforeClose={props.onBeforeClose}
                onAfterClose={props.onAfterClose}
              />
            )}
            onAfterClose={(entry) => setNotifications((prev) => prev.filter((n) => n !== entry))}
            entry={n}
          />
        ))
      }
    </div>
  );
};

NotificationManager.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    duration: PropTypes.number,
  })).isRequired,
  notificationRender: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func.isRequired,
};

export default NotificationManager;
