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
  margin: ".25rem",
};

const gordImage = {
  borderRadius: "50%",
  maxWidth: "200px",
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

const Gord = () => {
  const [allGords, setAllGords] = useState([]);
  const [childRating, setChildRating] = useState([]);
  const [alertDisplay, setAlertDisplay] = useState(false);

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
    <div className="mb-4">
      <div style={pageContainer} className="row d-flex justify-content-center flex-wrap">
        {allGords.map((gord) => (
          <div key={gord._id} style={gordContainer} className="col-md-3 p-2">
            <img style={gordImage} src={gord.img} alt="gord" />
            <p className="text-center gord-name">{gord.name}</p>
            <Rating gordId={gord._id} chooseRating={chooseRating} />
          </div>
        ))}
        <div id="alert" style={alertStyle}>
          All Gords need a ranking... <br></br>
          It's the Canadian thing to do, eh?
          <button
            class="btn btn-link"
            onClick={() => {
              document.getElementById("alert").style.display = "none";
              document.getElementById("submitButton").style.display = "block";
            }}
          >
            ok
          </button>
        </div>
        <div className="d-flex w-100 submitbutton-row">
          <button
            type="submit"
            id="submitButton"
            class="custom-button"
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
