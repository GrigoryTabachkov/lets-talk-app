import React from 'react'
import UserInfo from '../UserInfo/UserInfo'


const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    overflow: 'auto',
    height: 300,
    
  }
}
export default function UserList({list}){
  return(
    <>
    <div style={styles.div}>
      {
        list.map((el)=><UserInfo data={el} />)
        }
  </div>
  
    </>
  )
}
