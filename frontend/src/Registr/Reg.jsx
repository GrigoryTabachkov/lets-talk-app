import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/GrigoryTabachkov/lets-talk-app">
        Omg Production
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 3,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#A3BE8C',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    color: '#5E81AC',
    fontSize: '2vh',
    backgroundColor: '#A3BE8C',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Reg() {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    userName: '',
    password: '',
    email: '',
    interests: '',
  });
  const [interests, setInterests] = useState({
    interests: '',
  });

  const [checkbox, setCheckbox] = useState({
    Books: false,
    Movies: false,
    Dogs: false,
    Cats: false,
    JavaScript: false,
    Travel: false,
    Cooking: false,
    MachineLearning: false,
  });
  const {
    Books, Movies, Dogs, Cats, JavaScript, Travel, Cooking, MachineLearning,
  } = checkbox;

  const [setView] = useState('');

  const history = useHistory();

  async function toPutData(e) {
    if (e.target.userName !== '') {
      e.preventDefault();

      await setUserData({
        userName: e.target.userName.value,
        password: e.target.password.value,
        email: e.target.email.value,
        interests: interests.interests,
      });
      history.push('/');
    }
  }

  function toPutInterests(e) {
    e.preventDefault();
    setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
    setInterests({ ...userData, interests: [...interests.interests, e.target.name] });
  }

  const error = [Books, Movies, Dogs, Cats, JavaScript, Travel, Cooking, MachineLearning].filter((v) => v).length < 3;
  const errorFive = [Books, Movies, Dogs, Cats, JavaScript, Travel, Cooking, MachineLearning].filter((v) => v).length >= 5;

  useEffect(() => {
    (
      async () => {
        if (userData.userName !== '') {
          const response = await fetch('/registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userData,
            }),
          });
          const res = await response.json();
          setView(res);
        }
      }
    )();
  }, [userData]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        className={classes.paper}
        style={{
          zIndex: 2,
          padding: 25,
          background: '#ECEFF4',
          borderRadius: 10,
        }}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up and Lets Talk
        </Typography>
        <form className={classes.form} noValidate onSubmit={toPutData}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Your Name"
                autoFocus
              />
            </Grid>

            <div className={classes.root}>
              <FormControl required error={error} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Pick at least three Topics</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    label="Books"
                    control={(
                      <Checkbox
                        checked={Books}
                        onChange={toPutInterests}
                        name="Books"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
)}
                  />
                  <FormControlLabel
                    label="Movies"
                    control={(
                      <Checkbox
                        checked={Movies}
                        onChange={toPutInterests}
                        name="Movies"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
)}
                  />
                  <FormControlLabel
                    label="Dogs"
                    control={(
                      <Checkbox
                        checked={Dogs}
                        onChange={toPutInterests}
                        name="Dogs"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
)}
                  />
                  <FormControlLabel
                    label="Cats"
                    control={(
                      <Checkbox
                        checked={Cats}
                        onChange={toPutInterests}
                        name="Cats"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
)}
                  />
                </FormGroup>
              </FormControl>

              <FormControl required error={errorFive} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">But not more then five</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    label="JavaScript"
                    control={(
                      <Checkbox
                        checked={JavaScript}
                        onChange={toPutInterests}
                        name="JavaScript"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
)}
                  />
                  <FormControlLabel
                    label="Travel"
                    control={(
                      <Checkbox
                        checked={Travel}
                        onChange={toPutInterests}
                        name="Travel"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
)}
                  />

                  <FormControlLabel
                    label="Cooking"
                    control={(
                      <Checkbox
                        checked={Cooking}
                        onChange={toPutInterests}
                        name="Cooking"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
                    )}
                  />

                  <FormControlLabel
                    label="Machine Learning"
                    control={(
                      <Checkbox
                        checked={MachineLearning}
                        onChange={toPutInterests}
                        name="MachineLearning"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
                    )}
                  />

                </FormGroup>
              </FormControl>
            </div>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I Want to be on the map"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.button}
            >
              Lets Talk
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs>
                <Link href="/" variant="body1" className={classes.link}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
