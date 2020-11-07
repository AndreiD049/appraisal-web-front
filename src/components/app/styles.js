import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.spacing(7) + 1,
    },
  },
}));

export default useStyle;
