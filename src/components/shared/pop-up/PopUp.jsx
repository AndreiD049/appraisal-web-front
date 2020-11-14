import clsx from 'clsx';
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as BgError } from './assets/error.svg';
import { ReactComponent as BgWarning } from './assets/warn.svg';
import { ReactComponent as BgInfo } from './assets/info.svg';
import { ReactComponent as BgSuccess } from './assets/success.svg';
import close from './assets/close.png';
import play from './assets/play.png';
import pause from './assets/pause.png';
import useStyles from './styles';

const PopUp = ({
  entry, onBeforeClose, onAfterClose,
}) => {
  // default fields
  const type = entry.type || 'error';
  const entryLocal = {...entry, type};

  const classes = useStyles({ entry: entryLocal });
  const [open, setOpen] = useState(true);
  const [paused, setPaused] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const duration = entry.duration || 5;

  const handleTimeout = useCallback(async () => {
    onBeforeClose && await onBeforeClose();
    setOpen(false);
    onAfterClose && onAfterClose(entry);
  }, [entry, onAfterClose, onBeforeClose]);

  useEffect(() => {
    setTimerId(setTimeout(handleTimeout, duration * 1000));
  // eslint-disable-next-line
  }, [])

  const togglePaused = () => {
    if (!paused) {
      setTimerId((prev) => {
        clearTimeout(prev);
        return 0;
      });
    } else {
      setTimerId(setTimeout(handleTimeout,
        duration * 1000));
    }
    setPaused(!paused);
  };

  const handleClose = () => {
    clearTimeout(timerId);
    handleTimeout();
  };

  const BackgroundWatermark = () => {
    switch (type) {
      case 'error':
        return <BgError />;
      case 'info':
        return <BgInfo />;
      case 'warn':
        return <BgWarning />;
      case 'success':
        return <BgSuccess />;
      default:
        return null;
    }
  };

  return (
    <>
      {
      open
        ? (
          <div className={classes.popUpContainer}>
            <div className={classes.popUpWatermark}>
              <BackgroundWatermark />
            </div>
            <div className={classes.popUpToolbar}>
              <div className={classes.popUpControls}>
                {
                paused
                  ? (
                    <span role="button" onClick={() => togglePaused()} aria-hidden="true">
                      <img src={play} alt="Continue the pop-up timer" />
                    </span>
                  )
                  : (
                    <span onClick={() => togglePaused()} aria-hidden="true">
                      <img src={pause} alt="Pause the pop-up timer" />
                    </span>
                  )
              }
                <span onClick={() => handleClose()} aria-hidden="true">
                  <img src={close} alt="Close the pop-up" />
                </span>
              </div>
              <div
                className={clsx({
                  [classes.popUpTimer]: true,
                }, paused ? classes.popUpTimerOff : classes.popUpTimerOn)}
                style={{
                  animationDuration: `${duration}s`,
                }}
              />
            </div>
            <div className={classes.popUpDelimiter} />
            <div className={classes.popUpHeader}>
              <span>{entry.header ? entry.header.toUpperCase() : 'Error'}</span>
            </div>
            <div className={classes.popUpDelimiter} />
            <div className={classes.popUpContent}>
              {entry.content}
            </div>
          </div>
        )
        : null
    }
    </>
  );
};

PopUp.propTypes = {
  entry: PropTypes.shape({
    type: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    duration: PropTypes.number,
  }).isRequired,
  onBeforeClose: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func.isRequired,
};

export default PopUp;
