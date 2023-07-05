import React from 'react'
import styles from "./Card.module.scss"
import  Router  from 'next/router'
const Card = ({ticket,details}) => {
  
  return (
    <div className={`${styles.card_container}`}>
        <img src={ticket.imageUrl} />
        <p>${ticket.price}</p>
        <h2>{ticket.title}</h2>
        <h4>{ticket.location}</h4>
        {!details &&
         <div 
         onClick={()=>Router.push( `/tickets/${ticket.id}`)}
         className={`${styles.book_now}`}>
             Book Now
         </div>
        }
       
    </div>
  )
}

export default Card