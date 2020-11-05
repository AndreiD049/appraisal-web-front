import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  inputs: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default useStyles;