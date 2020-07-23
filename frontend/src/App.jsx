import React, {useState, useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import MapContainer from './components/Map/MapContainer.jsx';
import Registration from './Registr/Registration'
// import UserList from './components/UserList/UserLIst'
import { toSendCoordinat } from './redux/actions/actions';



const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',

  }
}
function App() {
  const [formAuth, setFormAuth] = useState({email: '', password: ''})
  const [user, setUser] = useState('')
  const form = document.querySelector('.authForm')
  console.log(form)
   function handleChange (e){
     console.log('click')
  e.preventDefault()
  console.log(e.target.email.value)
  setFormAuth({email: e.target.email.value, password: e.target.password.value})
  }
  useEffect(()=>{
    (
    async ()=>{
      if(formAuth.email!=''){
        const response = await fetch('/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({formAuth}),
      })
      const res = await response.json() 
      console.log(res)
      setUser(res)
      }
    }
    )()
  }, [formAuth])
  console.log('YOU', user)

  const state = useSelector(state=>state.users)
  console.log('APP', state)
  let arr = []
  for(let i=0; i<state.length; i++){
      if(state[i].location){
        arr.push(state[i])
      }
    
  }


  return (

    <>
    
    <BrowserRouter>
{!user&&(
  <div>
          <Switch>
            <Route path='/' exact>
        <form className="authForm" action="" onSubmit={handleChange}>
          <input name="email" type="text" placeholder="email"/>
        <input name="password" type="password" placeholder="password"/>
        <button type="submit">Sign In</button>
        </form>
        <Link to='/registration' exact>registration</Link>
            </Route>
        <Route path='/registration' exact>
        <Registration />
        <Link to='/' exact>Home</Link>
        </Route>
        </Switch>
      </div>


)}
</BrowserRouter>
     
   {user&&(
     <div className="App">
      <h1>Let`s talk</h1>
      <div style={styles.div}>
        {/* <UserList list={arr} /> */}
      <MapContainer data={user}/>
      </div>
      

    </div>
   )}
     
   </>
    
  );
}

export default App;
