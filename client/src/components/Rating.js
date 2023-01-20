import React, { useState, useEffect } from "react";
import styles from './styles.css';

export default function Home() {

const [rating, setRating] = useState('')

const handleChange = event => {
    setRating(event.target.value);
    console.log(rating);
}


  return (
    <div className="rating-container">
    <span class="rate">
        <button value="1" onClick={handleChange}>★</button>
        <button value="2" onClick={handleChange}>★</button>
        <button value="3" onClick={handleChange}>★</button>
        <button value="4" onClick={handleChange}>★</button>
        <button value="5" onClick={handleChange}>★</button>
    </span>

    </div>
  )
}
