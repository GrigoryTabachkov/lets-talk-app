import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import MapContainer from './components/Map/MapContainer.jsx';
import Registration from './Registr/Registration.jsx';
import UserList from './components/UserList/UserLIst';

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',

  },
};
function App() {
  const [formAuth, setFormAuth] = useState({ email: '', password: '' });
  const [user, setUser] = useState('');
  const form = document.querySelector('.authForm');
  console.log(form);
  function handleChange(e) {
    console.log('click');
    e.preventDefault();
    console.log(e.target.email.value);
    setFormAuth({ email: e.target.email.value, password: e.target.password.value });
  }
  useEffect(() => {
    (
      async () => {
        if (formAuth.email !== '') {
          const response = await fetch('/author', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formAuth }),
          });
          const res = await response.json();
          console.log(res);
          setUser(res);
        }
      }
    )();
  }, [formAuth]);
  console.log(user);

  const state = useSelector((state) => state.users);
  console.log('APP', state);
  const arr = [];
  for (let i = 0; i < state.length; i++) {
    if (state[i].location) {
      arr.push(state[i]);
    }
  }

  return (

    <>

      <BrowserRouter>
        {!user && (
        <div>
          <Switch>
            <Route exact path='/'>
              <form className="authForm" action="" onSubmit={handleChange}>
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="password" placeholder="password" />
                <button type="submit">Sign In</button>
              </form>
              <Link to='/registration'>registration</Link>
            </Route>
            <Route exact path='/registration'>
              <Registration />
              <Link to='/'>Home</Link>
            </Route>
          </Switch>
        </div>

        )}
      </BrowserRouter>

      {user && (
      <div className="App">
        <h1>Let`s talk</h1>
        <div style={styles.div}>
          <UserList
            key={Math.floor(Math.random() * 1000)}
            list={arr}
          />
          <MapContainer />
        </div>

      </div>
      )}

    </>

  );
}

export default App;
