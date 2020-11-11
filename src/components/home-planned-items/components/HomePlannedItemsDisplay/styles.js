import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
  },
  subheader: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  addInput: {
    width: '90%',
  },
  itemAchievedText: {
    textDecoration: 'line-through',
  },
}));

export default useStyles;
