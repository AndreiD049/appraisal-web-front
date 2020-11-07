import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@keyframes slideLeft': {
    from: { right: '-120%' },
    to: { right: '0' },
  },
  '@keyframes slideRight': {
    from: { right: '0' },
    to: { right: '-120%' },
  },
  root: {
    position: 'fixed',
    right: 10,
    bottom: 10,
    minWidth: 400,
    zIndex: 9999,
    '& > * + *': {
      marginTop: '.5em',
    },
  },
  containerTransition: {
    position: 'relative',
    animationName: '$slideLeft',
    animationDuration: 700,
    animationTiminFunction: 'ease-in-out',
  },
  containerTransitionOff: {
    animationName: '$slideRight',
    animationDuration: 700,
    animationTiminFunction: 'ease-in-out',
    animationFillMode: 'forwards',
  },
  'body * + *': {
    marginTop: '1.5em',
  },
});

export default useStyles;
