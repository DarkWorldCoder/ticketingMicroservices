import React from 'react'
import styles from "./Navbar.module.scss"
import {useRouter} from "next/router" 
const Navbar = () => {
  const router = useRouter()
  
  const pushToLink = (url)=>{
    router.push(`/${url}`)
  }
  return (
    <div className={`${styles.navbar_wrapper}`}>
        <div className={`${styles.nav_left}`}>
            <h2>Ticket Book</h2>
            <p>Global</p>
        </div>

        <div className={`${styles.nav_mid}`}>
            <div className={`${styles.nav_items} ${styles.active_menu} `}>
                Home
            </div>
            <div className={`${styles.nav_items}`}>
                Sell Tickets
            </div>
            <div className={`${styles.nav_items}`}>
                My Orders
            </div>
            
            <div className={`${styles.nav_items}`}>
                Blogs
            </div>
        </div>
        <div className={`${styles.nav_end}`}>
            <div 
            onClick={()=>pushToLink("/auth/signin")}
            className={`${styles.nav_login}`}>
                Login
            </div>
            <div 
            onClick={()=>pushToLink("/auth/signup")}
            className={`${styles.nav_signup}`}>
                Sign Up
            </div>
        </div>
    </div>
  )
}

export default Navbar