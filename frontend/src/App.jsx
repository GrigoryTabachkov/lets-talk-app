import React, {useState, useEffect} from 'react';
import './App.css';
import MapContainer from './components/Map/MapContainer.jsx';
// import TalkPerson from './components/TalkPerson/TalkPerson.jsx';

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
    )()
  }, [formAuth])
  console.log(user)
  return (

    <>
{!user&&(
   <div>
        <form className="authForm" action="" onSubmit={handleChange}>
          <input name="email" type="text" placeholder="email"/>
        <input name="password" type="password" placeholder="password"/>
        <button type="submit">Войти</button></form>
        
      </div>
)}
     
   {user&&(
      <div className="App">
      <h1>Let`s talk</h1>
      {/* <TalkPerson /> */}
      <MapContainer />
    </div>
   )}
     
   </>
    
  );
}

export default App;
