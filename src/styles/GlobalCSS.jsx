import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    // Flex container with all children centered
    '.centerFlexRow': {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
    },
    '.centerFlexColumn': {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    '.flexColumn': {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'flex-start',
    },
    '.textDecorationOff': {
      textDecoration: 'none',
    },
    // Lobotomized owl
    '.owl': {
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
    '.owlHorizontal': {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    '.fullWidth': {
      width: '100%',
    },
  },
}));

export default function GlobalCss() {
  useStyles();

  return null;
}
