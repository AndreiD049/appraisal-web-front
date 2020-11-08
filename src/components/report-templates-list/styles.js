import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
