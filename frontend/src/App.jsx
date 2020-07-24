import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import mainBackGround from './assets/Suspension-Bridge-Jungle-Forest.jpg';
import MapContainer from './components/Map/MapContainer.jsx';
import Reg from './Registr/Reg.jsx';
import Login from './Registr/Login.jsx';
import Context from './context/Context';
import Header from './components/Header/Header.jsx';

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',
  },
};
function App() {
  const [formAuth, setFormAuth] = useState({ email: '', password: '' });
  const [user, setUser] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    setFormAuth({ email: e.target.email.value, password: e.target.password.value });
  };

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
  console.log('YOU', user);

  const state = useSelector((state) => state.users);
  console.log('APP STATE: ', state);
  const arr = [];
  for (let i = 0; i < state.length; i += 1) {
    if (state[i].location) {
      arr.push(state[i]);
    }
    console.log('USERARRAY: ', arr);
  }

  return (
    <>
      {user && <Header user={user} />}

      <Context.Provider value={{ formAuth, setFormAuth }}>
      <BrowserRouter>
        {!user && ( // !user  user.userName === ''
        <Switch>
          <Route exact path='/'>
            { /* onSubmit={handleChange} */ }
            <Login />
          </Route>
          <Route exact path='/registration'>
            <Reg />
          </Route>
        </Switch>

        )}
      </BrowserRouter>
      </Context.Provider>

      {user && ( // user.userName !== ''
      <div className="App">
        <div style={styles.div}>
          {/* <UserLIst list={arr} /> */}
          <MapContainer data={user} />
        </div>

      </div>
      )}
    </>
  );
}

export default App;
