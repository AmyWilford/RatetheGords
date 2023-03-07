// WORKING VOTING REFERENCE

import React, { useState, useEffect } from "react";
import { getGords } from "../utils/API";
import Rating from "./Rating";
import "./styles.css";
const Gord = () => {
  const [allGords, setAllGords] = useState([]);
  const [childRating, setChildRating] = useState([]);
  const [submited, setSubmitted] = useState(false);

  const chooseRating = (rating) => {
    setChildRating([...childRating, rating]);
    console.log(childRating);
  };

  const clearRating = (value) => {
    value = null;
  };
  const getTheGords = async () => {
    try {
      const response = await getGords();
      console.log(response);
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      setAllGords(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = (response) => {
    fetch("/api/gords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    }).catch((err) => {
      console.error(err);
      return;
    });
  };

  // remoaved async from this
  const handleSubmit = (event) => {
    childRating.forEach((el) => {
      const response = el;
      handleVote(response);
    });
    setSubmitted(true);
  };

  useEffect(() => {
    getTheGords();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row d-flex flex-wrap">
          {allGords.map((gord) => (
            <div key={gord._id} className="col-md-3 p-2">
              <img
                src={gord.img}
                className="img-fluid gord-img"
                alt="gord"
              ></img>
              <p className="text-center gord-name">{gord.name}</p>
              <Rating
                gordId={gord._id}
                chooseRating={chooseRating}
                submited={submited}
              />
            </div>
          ))}
          <div className="d-flex w-100 justify-content-end">
            <button type="submit" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gord;
