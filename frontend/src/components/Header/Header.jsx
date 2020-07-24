import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo2 from '../../assets/white.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    // backgroundColor: '#D8DEE9',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Header(user) {
  const classes = useStyles();

  return (
    <header
      className={classes.root}
      style={{ backgroundImage: logo2 }}
    >
      <Grid
        // item
        // xs={6}
        direction="column"
        className={classes.control}
      >

        <Paper className={classes.paper}>
          Hello,
          {' '}
          {user.user.user.userName}
          ,
          Glad to see you!
        </Paper>
        <Paper className={classes.paper}>
          Let`s check your interests for today:
        </Paper>
      </Grid>

      <Grid
        item
        xs={6}
        direction="column"
        className={classes.control}
      >
        {user.user.user.interests.map((el) => (
          <Paper direction="row" className={classes.control}>
            {el}
          </Paper>
        ))}
      </Grid>
      {' '}
      <img height="240px" width="440px" src={logo2} alt="Lets Talk" />
    </header>
  );
}
