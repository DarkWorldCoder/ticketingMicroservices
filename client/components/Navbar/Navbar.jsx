import React from 'react'
import styles from "./Navbar.module.scss"
import {useRouter} from "next/router" 
const Navbar = ({currentUser}) => {
  const router = useRouter()
  
  const pushToLink = (url)=>{
    router.push(`${url}`)
  }
  console.log(currentUser)
  const active = router.asPath.split("/")[1]
  return (
    <div className={`${styles.navbar_wrapper}`}>
        <div className={`${styles.nav_left}`}>
            <h2>Ticket Book</h2>
            <p>Global</p>
        </div>

        <div className={`${styles.nav_mid}`}>
            <div
            onClick={()=>pushToLink("/")}
            className={`${styles.nav_items} ${active==""&&styles.active_menu} `}>
                Home
            </div>
            <div 
            onClick={()=>pushToLink("/tickets/new")}
            className={`${styles.nav_items} ${active=="tickets"&&styles.active_menu}`}>
                Sell Tickets
            </div>
            <div 
            onClick={()=>pushToLink("/orders")}
            className={`${styles.nav_items} ${active=="orders"&&styles.active_menu}`}>
                My Orders
            </div>
            
            <div className={`${styles.nav_items}`}>
                Blogs
            </div>
        </div>
        {!currentUser?
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
 </div>:
        <div 
        onClick={()=>pushToLink("/auth/signout")}
        className={`${styles.nav_logout}`}>
            Log out
        </div>
    }
       
    </div>
  )
}

export default Navbar