import React from 'react'
import styles from "./HeroSection.module.scss"
const HeroSection = () => {
  return (
    <div className={`${styles.hero}`}>
        <div className={`${styles.hero_left}`}>
            <p>All the fun starts here</p>
            <div className={`${styles.hero_slog}`}>
            <h1>Book Your</h1>
            <h1><span>Tickets</span> For Event</h1>
            </div>
           
            <ul>
            <li>Safe secure, Reliable Ticketing</li>
            <li>Your Ticket to love entertainment</li>

             </ul>

             <div className={`${styles.view_more}`}>
                View More
             </div>
        </div>
        <div className={`${styles.hero_right}`}>
           <div className={`${styles.image_wrapper_left}`}>
            <img 
            className={`${styles.image_one}`}
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" />
            <img
            className={`${styles.image_two}`}
            src="https://media.istockphoto.com/id/1189205501/photo/cheering-crowd-of-unrecognized-people-at-a-rock-music-concert-concert-crowd-in-front-of.jpg?s=612x612&w=0&k=20&c=_vgyStdIBHCbnDHdu3lNTwfJxt2fTcJc9PB345ryhZo=" />
           </div>
           <div className={`${styles.image_wrapper_right}`}>
            
           <img
           className={`${styles.image_one}`}
           src="https://assets.telegraphindia.com/telegraph/2022/Jun/1654539874_new-project.jpg"/>
            <img
           className={`${styles.image_two}`}
           src="https://www.rollingstone.com/wp-content/uploads/2023/05/GettyImages-1353016145.jpg?w=1581&h=1054&crop=1"/>

           </div>
        </div>


        
    </div>
    
  )
}

export default HeroSection