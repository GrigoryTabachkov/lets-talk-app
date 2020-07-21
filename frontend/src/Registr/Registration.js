import React, {useState, useEffect} from 'react'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 200
  }
}
export default function Registration() {
const [userData, setUserData] = useState({
  userName: '',
  password: '',
  email: '',
  interests: '',
})
const [view, setView] = useState('')
const form01 = document.querySelector('.formName')
console.log('q1q1q1q1', form01)

  function toPutData(e){
    if(e.target.userName!==''){
    console.log('Click2')
    console.log(e.target)

    e.preventDefault()
    setUserData({
      userName: e.target.userName.value,
      password: e.target.password.value,
      email: e.target.email.value,
      interests: e.target.interests.value,
    })
    }
    
  }
  console.log(userData)
  
  useEffect(()=>{
      (
        async ()=>{
          if(userData.userName!==''){
            const response = await fetch('/info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userData
            }
            )
          })
          const res = await response.json()
          console.log(res)
          setView(res)
          }
          
        }
      )()
  }, [userData])
  return (
    
    
      <form className="formName" action="" style={styles.form} onSubmit={toPutData}>
      <input type="text" name="userName" placeholder="name"/>
      <input type="password" name="password" placeholder="password"/>
      <select multiple name="interests" id="">
      <option value="Cars">Cars</option>
      <option value="Books">Books</option>
      <option value="Techoligy">Techoligy</option>
      <option value="IT">IT</option>
      </select>
      <input type="email" name="email" placeholder="email"/>
      <button>create accaunt</button>
      </form>
   
  
  )
}
