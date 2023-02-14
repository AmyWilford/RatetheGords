// WORKING VOTING REFERENCE

import React, { useState, useEffect } from "react";
import { getGords, createVote, getSingleGord } from "../utils/API";
import Rating from "./Rating";
import "./styles.css";
// export default function Gord() {
const Gord = () => {
  const [allGords, setAllGords] = useState([]);
  const [childRating, setChildRating] = useState([]);
  const [myData, setMyData] = useState([]);

  const chooseRating = (rating) => {
    setChildRating([...childRating, rating]);
    console.log(childRating);
  };
  // const [singleVote, setSingleVote] = useState({
  //   gordId: "",
  //   rating: "",
  // });
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

  const handleSubmit = async (event) => {
    // let gordId;
    // let rating;
    // let allVotesArray = [];
    // const allVotes = document.querySelectorAll(".gordRating");
    // allVotes.forEach((vote) => {
    //   gordId = vote.attributes.dataid.value;
    //   rating = vote.value;
    //   console.log(rating);
    //   allVotesArray.push({ gordId, rating });
    // });
    // console.log(allVotesArray);

    // console.log(allVotesArray[0]);
    childRating.forEach((el) => {
      const response = el;
      handleVote(response);
    });
  };

  useEffect(() => {
    getTheGords();
  }, []);

  // the second parameter is an array - and whenever these values change ,the render will reun
  // an empty array is equivelent to [on mount]
  return (
    <div>
      <div className="container">
        <div className="row d-flex flex-wrap">
          {allGords.map((gord) => (
            <div key={gord._id} className="col-md-3 p-2">
              <img src={gord.img} className="img-fluid" alt="gord"></img>
              <p className="text-center">{gord.name}</p>
              {/* <input
                className="gordRating"
                dataid={gord._id}
                type="number"
                min="1"
                max="5"
              ></input> */}
              <Rating gordId={gord._id} chooseRating={chooseRating} />
            </div>
          ))}
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-warning"
          >
            submit vote
          </button>
        </div>
      </div>
    </div>
  );
};
export default Gord;
