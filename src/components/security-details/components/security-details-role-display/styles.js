import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    '& > *:last-child': {
      marginBottom: theme.spacing(5),
    },
  },
  selector: {
    maxWidth: '300px',
    margin: '0 auto',
  },
  toolBar: {
    padding: theme.spacing(3),
    display: 'flex',
    flexFlow: 'row nowrap',
    '& > * + *': {
      marginLeft: theme.spacing(3),
    },
  },
  permissionDescription: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  permissionBox: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
}));

export default useStyles;
