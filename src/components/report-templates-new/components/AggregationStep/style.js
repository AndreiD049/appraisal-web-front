import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  multilineInput: {
    width: '100%',
    '& textarea': {
      minHeight: 400,
    },
  },
}));

export default useStyles;
