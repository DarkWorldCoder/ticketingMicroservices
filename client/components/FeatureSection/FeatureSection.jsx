import React from 'react'
import styles from "./FeatureSection.module.scss"
import Card from '../Card/Card'

const FeatureSection = ({tickets}) => {
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.card_container}`}>

      <div className={`${styles.header}`}>
        <h1>Concerts</h1>
        <p>Make sure you won't miss this events</p>
      </div>
      <div className={`${styles.card_wrapper}`}>
        {tickets.map(ticket =>(
          <Card 
          details={false}
          ticket={ticket}/>
        ))}

      </div>
      
    </div>       
    </div>
  )
}

export default FeatureSection