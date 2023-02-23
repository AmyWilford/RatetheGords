import React, { useState, useEffect } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import "./styles.css";

const Rating = ({ gordId, chooseRating }) => {
  const [assignedRating, setAssignedRating] = useState(null);
  const [hover, setHover] = useState(null);

  //   const handleSubmit = (event) => {
  //     let gordId;
  //     let rating;
  //     let allVotesArray = [];
  //     const allVotes = document.querySelectorAll(".gordRatingTest");
  //     allVotes.forEach((vote) => {
  //       gordId = vote.attributes.dataid.value;
  //       // rating = vote.value;
  //       rating = rating.value;
  //       console.log(rating);
  //       allVotesArray.push({ gordId, rating });
  //     });

  return (
    <div className="text-center">
      {[...Array(5)].map((leaf, i) => {
        const rating = i + 1;
        return (
          <label>
            <input
              className="gordRatingTest"
              type="radio"
              dataid={gordId}
              name="rating"
              value={rating}
              onClick={() => {
                setAssignedRating(rating);
                chooseRating({ gordId, rating });
              }}
              // onClick={() => chooseRating({gordId, rating})}
            />
            <FaCanadianMapleLeaf
              className="mapleleaf"
              color={
                rating <= (hover || assignedRating) ? "#ED452B" : "#e4e5e9"
              }
              size={30}
              onMouseEnter={() => setHover(rating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
