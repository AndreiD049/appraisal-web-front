import React, { useState } from 'react'
import clsx from 'clsx';
import useStyles from './styles';

const NotificationContainer = (props) => {
  const classes = useStyles(props) 
  const [closing, setClosing] = useState(false);

  return (
    <div className={clsx(classes.containerTransition, {
      [classes.containerTransitionOff]: closing,
    })}>
      {props.notificationRender(props.entry, {
        entry: props.entry, 
        closeTimeOffset: 5, 
        onAfterClose: props.onAfterClose,
        onBeforeClose: () => {
          return new Promise((res, rej) => {
            setClosing(true);
            setTimeout(() => {
              res();
            } ,700)
          })
        } 
       })}
    </div>
  );
}

const NotificationManager = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {
        props.notifications.map((n, idx) => {
          return (
            <NotificationContainer key={n.id} {...props} entry={n} />
          );
        })
      }
    </div>
  );
}

export default NotificationManager;