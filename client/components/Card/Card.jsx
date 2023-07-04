import React from 'react'
import styles from "./Card.module.scss"
const Card = () => {
  return (
    <div className={`${styles.card_container}`}>
        <img src="https://nypost.com/wp-content/uploads/sites/2/2022/11/Ed-Sheeran.jpg?quality=75&strip=all&w=744" />
        <p>$300</p>
        <h2>Ed sheeran: Olive</h2>
        <h4>Washington</h4>
        <div className={`${styles.book_now}`}>
            Book Now
        </div>
    </div>
  )
}

export default Card