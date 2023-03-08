import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGords } from "../utils/API";
import Rating from "./Rating";
import "./styles.css";

const pageContainer = {
  paddingTop: "15rem",
};
const gordContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textTransform: "uppercase",
  fontWeight: "bold",
  margin: ".5rem",
};

const gordImage = {
  borderRadius: "50%",
  maxWidth: "200px",
};

const Gord = () => {
  const [allGords, setAllGords] = useState([]);
  const [childRating, setChildRating] = useState([]);

  const navigate = useNavigate();

  const routeChangeThankYou = () => {
    let path = `/thankyou`;
    navigate(path);
  };

  const chooseRating = (rating) => {
    setChildRating([...childRating, rating]);
    console.log(childRating);
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

  const handleSubmit = async (event) => {
    if (childRating.length !== 8) {
      alert("all gords must be rated");
    } else {
      childRating.forEach((el) => {
        const response = el;
        handleVote(response);
      });
      routeChangeThankYou();
    }
  };
  useEffect(() => {
    getTheGords();
  }, []);

  return (
    <div className="container">
      <div style={pageContainer} className="row d-flex flex-wrap">
        {allGords.map((gord) => (
          <div key={gord._id} style={gordContainer} className="col-md-3 p-2">
            <img style={gordImage} src={gord.img} alt="gord" />
            <p className="text-center gord-name">{gord.name}</p>
            <Rating gordId={gord._id} chooseRating={chooseRating} />
          </div>
        ))}
        <div className="d-flex w-100 justify-content-end">
          <button type="submit" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Gord;
