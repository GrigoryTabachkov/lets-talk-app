import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Context from '../../context/Context';

const styles = {
  div: {
    height: 184,
    width: 340,
    border: 'solid black 1px',
    borderRadius: 10,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: 5,
    margin: 5,
    fontSize: 24,
    fontWeight: 'bold',
    fontColor: '#E5E9F0',

  },
  span: {
    margin: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: '#5E81AC',
    backgroundColor: '#A3BE8C',
  },
}));

export default function Chart({ user }) {
  const classes = useStyles();

  const [message, setMessage] = useState([]);
  const { userChoose } = useContext(Context);
  console.log('userChoose', userChoose);

  console.log('ChartUser', user.user._id);
  const W1 = new WebSocket('ws://localhost:8090');
  W1.onopen = () => {
    console.log('connect');
  };
  W1.onmessage = (data) => {
    console.log('Message!!!!', JSON.parse(data.data));

    const dataParse = JSON.parse(data.data);
    const rightMess = dataParse.charts.filter((el) => {
      if (el.userId1 === user.user._id || el.userId2 === user.user._id) {
        return el;
      }
    });
    setMessage(rightMess);
  };

  W1.onclose = function () {
    console.log('connectionClose');
  };

  function handleClick(e) {
    e.preventDefault();
    console.log('ClickChart', e.target.myMes.value);
    // W2.send(user.user._id);
    W1.send(JSON.stringify({
      text: e.target.myMes.value,
      userName: user.user.userName,
      userId1: user.user._id,
      userId2: userChoose,
    }));
    e.target.myMes.value = '';
  }

  return (
    <>
      <form id="chartForm" action="" onSubmit={handleClick}>
        <Input
          name="myMes"
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            fontColor: '#E5E9F0',
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Send
        </Button>
      </form>

      <FormControl className="chartBody" style={styles.div}>
        {
          message.map((el) => (
            <span style={styles.span}>
              {el.userName}
              :
              {' '}
              {el.text}
            </span>
          ))
        }
      </FormControl>
    </>
  );
}
