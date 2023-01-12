import React, { useState, useEffect } from "react";
import { getGords, createVote } from "../utils/API";
import "./styles.css";
// export default function Gord() {
const Gord = () => {
  const [allGords, setAllGords] = useState([]);
// const gordId = document.getElementById('gordId');
const gordVote = document.getElementById('gordRating')

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

  // const handleVote = async(event) => {
   
  //   try {
  //     const response = await createVote(gordId, gordVote);
  //     if(!response.ok) {
  //       throw new Error ('something went wrong')
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

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
            <p id="gordId">{gord._id}</p>
              <img src={gord.img} className="img-fluid" alt="gord"></img>
              <p className="text-center">{gord.name}</p>
              <input id="gordRating" type="number"></input>
              <button type="submit" className="btn btn-warning" >submit vote</button>
            </div>
          ))}
        </div>
      </div>
      {/* show the number of gords to prove that info is actually pulling. Will access details later */}
    </div>
  );
};
export default Gord;
