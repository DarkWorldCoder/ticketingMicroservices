import React from 'react'
import styles from "./FeatureSection.module.scss"
import Card from '../Card/Card'

const FeatureSection = () => {
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.card_container}`}>

      <div className={`${styles.header}`}>
        <h1>Concerts</h1>
        <p>Make sure you won't miss this events</p>
      </div>
      <div className={`${styles.card_wrapper}`}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />


      </div>
      
    </div>       
    </div>
  )
}

export default FeatureSection