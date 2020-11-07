import { makeStyles } from '@material-ui/core/styles';

const palette = {
  info: {
    text: '#ffffff',
    bg: '#1976d2',
    bgLight: '#63a4ff',
    bgDark: '#004ba0',
  },
  warning: {
    text: '#000000',
    bg: '#ffa000',
    bgLight: '#ffd149',
    bgDark: '#c67100',
  },
  error: {
    text: '#ffffff',
    bg: '#d32f2f',
    bgLight: '#ff6659',
    bgDark: '#9a0007',
  },
  success: {
    text: '#000000',
    bg: '#00c853',
    bgLight: '#5efc82',
    bgDark: '#009624',
  },
};

const useStyles = makeStyles({
  '@keyframes timerSlide': {
    from: { width: '100%' },
    to: { width: '0px' },
  },
  '@keyframes test': {
    '0%': { },
    '100%': {},
  },
  popUpContainer: (props) => ({
    position: 'relative',
    backgroundColor: palette[props.entry.type].bg,
    borderRadius: 3,
    color: palette[props.entry.type].text,
    overflow: 'hidden',
    maxWidth: 400,
    opacity: '0.7',
    fontFamily: 'Roboto',
    '& > *:last-child': {
      padding: '1em',
    },
  }),
  popUpHeader: {
    fontSize: '1.5em',
    padding: '0.2em 0',
    textAlign: 'center',
  },
  popUpWatermark: {
    position: 'absolute',
    width: '30%',
    height: '100%',
    right: '0%',
    top: '0%',
    opacity: '0.8',
    mixBlendMode: 'soft-light',
    '& > *': {
      width: '100%',
      height: 'auto',
    },
  },
  popUpDelimiter: (props) => ({
    borderTop: `1px solid ${palette[props.entry.type].bgDark}`,
    borderBottom: `1px solid ${palette[props.entry.type].bgLight}`,
  }),
  popUpToolbar: {
    position: 'relative',
    padding: '2px 0',
  },
  popUpTimer: (props) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: palette[props.entry.type].bgDark,
    mixBlendMode: 'multiply',
    zIndex: '1',
  }),
  popUpTimerOn: {
    animationName: '$timerSlide',
    animationTimingFunction: 'linear',
  },
  popUpTimerOff: {
    width: '100%',
  },
  popUpControls: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignContent: 'center',
    '& > *': {
      zIndex: '2',
      cursor: 'pointer',
      height: '20px',
      padding: '0 0.1em 0 0.1em',
    },
    '& img': {
      height: '100%',
    },
  },
  popUpContent: {
    textAlign: 'center',
  },
});

export default useStyles;
