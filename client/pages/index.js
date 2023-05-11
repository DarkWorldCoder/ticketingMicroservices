
import buildClient from 'api/build-client'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
const  Home = ({currentUser})=> {
    
  return currentUser?(
    <h1>You are signed in</h1>
  ):(
    <h2>you are not signed in</h2>
  )
}

Home.getInitialProps = async(context)=>{
  const {data} = await buildClient(context).get("/api/users/currentuser")
  
  if (data){
    return data
  }else{
    return {}
  }

}

export default Home