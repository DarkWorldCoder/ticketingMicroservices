import React from 'react'
import styles from "./HeroSection.module.css"
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
            Right
        </div>

        
    </div>
    
  )
}

export default HeroSection