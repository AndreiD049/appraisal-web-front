import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  formContainer: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default useStyles;
