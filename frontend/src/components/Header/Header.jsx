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
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    margin: '1px',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#3B4252',
  },
  control: {
    padding: theme.spacing(2),
    margin: '1px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#88C0D0',
    hover: true,
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
        direction="column"
        className={classes.paper}
      >

        <Paper className={classes.paper}>
          Hello,
          {' '}
          {user.user.user.userName}
          ,
          Glad to see you!
        </Paper>
        <Grid
          direction="column"
          className={classes.paper}
        >
          <Paper className={classes.paper}>
            Let`s check your interests for today:
          </Paper>
        </Grid>
      </Grid>

      <Grid
        item
        xs={6}
        direction="column"
        className={classes.control}
      >
        {user.user.user.interests.map((el) => (
          <Paper
            direction="row"
            style={{
              hover: {
                boxShadow: '0 0 11px rgba(33,33,33,.2)',
              },
            }}
            className={classes.control}
          >
            {el}
          </Paper>
        ))}
      </Grid>
      {' '}
      <img height="180px" width="720px" src={logo2} alt="Lets Talk" />
    </header>
  );
}
