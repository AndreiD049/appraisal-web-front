import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paddedContainer: {
    padding: theme.spacing(1),
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  row: {
    display: 'block',
  },
  textarea: {
    width: '100%',
    '& textarea': {
      width: '100%',
    },
  },
  ceneteredItems: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default useStyles;
