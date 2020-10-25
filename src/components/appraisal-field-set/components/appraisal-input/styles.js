import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%'
  },
  startAdornment: {
    cursor: 'pointer',
    '& > *:last-child': {
      marginRight: theme.spacing(1),
    }
  }
}));

export default useStyles;