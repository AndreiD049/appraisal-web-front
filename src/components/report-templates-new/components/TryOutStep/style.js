import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default useStyles;
