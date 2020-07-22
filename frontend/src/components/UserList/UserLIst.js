import React from 'react'
import UserInfo from '../UserInfo/UserInfo'

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    
  }
}
export default function UserList({list}){
  return(
    
    <div style={styles.div}>
      {
        list.map((el)=><UserInfo data={el} />)
        }
  </div>
    
  )
}