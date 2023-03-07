import React, { useState } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import "./styles.css";

const Rating = ({ gordId, chooseRating }) => {
  const [assignedRating, setAssignedRating] = useState(null);
  const [hover, setHover] = useState(null);

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