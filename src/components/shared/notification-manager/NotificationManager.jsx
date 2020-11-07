import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
  notifications, notificationRender, onAfterClose, ...props
}) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {
        notifications.map((n) => (
          <NotificationContainer
            key={n.id}
            notificationRender={notificationRender}
            onAfterClose={onAfterClose}
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
