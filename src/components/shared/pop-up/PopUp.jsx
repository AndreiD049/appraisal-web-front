import clsx from "clsx";
import React, { useEffect, useState, useCallback } from "react";
import { ReactComponent as BgError } from './assets/error.svg';
import { ReactComponent as BgWarning } from './assets/warn.svg';
import { ReactComponent as BgInfo } from './assets/info.svg';
import { ReactComponent as BgSuccess } from './assets/success.svg';
import close from './assets/close.png';
import play from './assets/play.png';
import pause from './assets/pause.png';
import useStyles from './styles.js';


const PopUp = (props) => {
  // default fields
  props.entry.type = props.entry.type || 'error';

  const classes = useStyles(props);
  const [open, setOpen] = useState(true);
  const [paused, setPaused] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const duration = props.entry.duration || 5;

  const handleTimeout = useCallback(async () => {
          props.onBeforeClose && await props.onBeforeClose();
          setOpen(false);
          props.onAfterClose && props.onAfterClose(props.entry);
  }, [props]);


  useEffect(() => {
    setTimerId(setTimeout(handleTimeout, duration * 1000))
  // eslint-disable-next-line
  }, [])

  const togglePaused = () => {
    if (!paused) {
      setTimerId(prev => {
        clearTimeout(prev);
        return 0;
      })
    } else {
      setTimerId(setTimeout(handleTimeout,
         duration * 1000));
    }
    setPaused(!paused);
  };

  const handleClose = () => {
    clearTimeout(timerId);
    handleTimeout();
  }

  const BackgroundWatermark = () => {
    switch (props.entry.type) {
      case 'error':
        return <BgError />
      case 'info':
        return <BgInfo />
      case 'warn':
        return <BgWarning/>
      case 'success':
        return <BgSuccess />
      default:
        return null;
    }
  }

  return (
    <>
    {
      open?
      (
        <div className={classes.popUpContainer}>
          <div className={classes.popUpWatermark}>
            <BackgroundWatermark/>
          </div>
          <div className={classes.popUpToolbar}>
            <div className={ classes.popUpControls }>
              {
                paused ? 
                (
                  <span onClick={() => togglePaused()}>
                    <img src={play} alt='Continue the pop-up timer' />
                  </span>
                ) : 
                (
                  <span onClick={() => togglePaused()}>
                    <img src={pause} alt='Pause the pop-up timer' />
                  </span>
                )
              }
              <span onClick={() => handleClose()}>
                <img src={close} alt='Close the pop-up' />
              </span>
            </div>
            <div className={clsx({
              [classes.popUpTimer]: true,
              }, paused ? classes.popUpTimerOff : classes.popUpTimerOn )}
              style={{
                animationDuration: `${duration}s`,
              }}
            ></div>
          </div>
          <div className={classes.popUpDelimiter} />
          <div className={classes.popUpHeader}>
            <span>{props.entry.header ? props.entry.header.toUpperCase() : 'Error'}</span>
          </div>
          <div className={classes.popUpDelimiter} />
          <div className={classes.popUpContent} >
            {props.entry.content}
          </div>
        </div>
      ) :
      null
    }
    </>
  );
};

export default PopUp;