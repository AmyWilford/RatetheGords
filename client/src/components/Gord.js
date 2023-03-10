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
};

const gordImage = {
  borderRadius: "50%",
  maxWidth: "175px",
};

const alertStyle = {
  width: "100%",
  display: "none",
  textAlign: "center",
  fontSize: "18px",
  backgroundColor: "#ED452B",
  color: "white",
  padding: ".5rem 0rem",
};

const alertConfirmationStyle = {
  color: "white",
  textDecoration: "underline",
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
    childRating.forEach((el) => {
      if (el.gordId === rating.gordId) {
        el.rating = rating.rating;
        childRating.pop();
      }
    });
    setChildRating([...childRating, rating]);
  };

  const getTheGords = async () => {
    try {
      const response = await getGords();
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
      document.getElementById("alert").style.display = "block";
      document.getElementById("submitButton").style.display = "none";
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
    <div className="mb-5">
      <div
        style={pageContainer}
        className="row d-flex justify-content-center flex-wrap"
      >
        {allGords.map((gord) => (
          <div key={gord._id} style={gordContainer} className="col-md-3 p-1">
            <div className="imageContainer">
              <img
                className="box"
                style={gordImage}
                src={gord.img}
                alt={gord.name}
              />
              <div className="box overlay">
                <p>{gord.bio}</p>
              </div>
            </div>
            <p className="text-center gord-name font-weight-bold text-uppercase">
              {gord.name}
            </p>
            <Rating gordId={gord._id} chooseRating={chooseRating} />
          </div>
        ))}
        <div id="alert" style={alertStyle}>
          <div>
            All Gords need a rating... <br></br>
            It's the Canadian thing to do, eh?
          </div>
          <button
            style={alertConfirmationStyle}
            className="btn btn-link hoverStye"
            onClick={() => {
              document.getElementById("alert").style.display = "none";
              document.getElementById("submitButton").style.display = "block";
            }}
          >
            Finish Ratings
          </button>
        </div>
        <div className="d-flex w-100 submitbutton-row">
          <button
            type="submit"
            id="submitButton"
            className="custom-button"
            onClick={handleSubmit}
          >
            submit ratings
          </button>
        </div>
      </div>
    </div>
  );
};
export default Gord;
