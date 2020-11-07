import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInput: {
    width: '90%',
  },
  itemAchievedText: {
    textDecoration: 'line-through',
  },
}));

export default useStyles;
