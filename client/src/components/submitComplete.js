import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVotes } from "../utils/API";
import { FaCanadianMapleLeaf } from "react-icons/fa";

import Loading from "../components/Loading";

const submitHeaderStyles = {
  backgroundColor: "#ED452B",
  color: "white",
  width: "100%",
  textAlign: "center",
  padding: "1rem 0rem",
  marginBottom: "1rem",
};
const submitDivStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const gordImage = {
  borderRadius: "50%",
  width: "25px",
  marginRight: ".5rem",
};

const styledTopGord = {
  borderRadius: "50%",
  width: "85px",
};

const iconStyle = {
  color: "white",
};

const SubmitComplete = () => {
  const [allVotes, setAllVotes] = useState([]);
  const [voteTotal, setVoteTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  let ranking = 0;

  const navigate = useNavigate();

  const routeChangeGords = () => {
    let path = `/`;
    navigate(path);
  };

  const getVotes = async () => {
    try {
      const response = await getAllVotes();
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      sortData(data);
      setVoteTotal(data[0].votes.length);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const sortData = (data) => {
    let sortedData = data.sort((a, b) => a.vote_sum - b.vote_sum).reverse();
    setAllVotes(sortedData);
  };

  useEffect(() => {
    getVotes();
  }, []);

  return (
    <div style={submitDivStyle}>
      <div style={submitHeaderStyles}>
        <h4>
          Thank you for rating <br></br>Canada's Gords
        </h4>
        <FaCanadianMapleLeaf style={iconStyle} size={30} />
      </div>
      {loading && (
        <div>
          <Loading loadType={"results"} />
        </div>
      )}
      {!loading && allVotes.length > 0 && (
        <>
          {allVotes.map((votes, index) => {
            if (index === 0) {
              return (
                <div
                  key={votes._id}
                  className="d-flex flex-column align-items-center mb-3 text-center"
                >
                  <h5>Canada's Top Gord is...</h5>
                  <img
                    style={styledTopGord}
                    src={votes.img}
                    alt={votes.name}
                  ></img>
                  <h5>{votes.name}</h5>
                </div>
              );
            }
            return;
          })}
          <table className="responsiveTable">
            <tbody>
              <tr>
                <th colSpan="3" className="text-center">
                  Gord Power Rankings<br></br>
                  <small className="pt-3 text-right pb-4">
                    Total votes placed: {voteTotal}{" "}
                  </small>
                </th>
              </tr>
              <tr>
                <th className="text-center">RANK</th>
                <th>GORD</th>
              </tr>
              {allVotes.map((vote) => (
                <tr key={vote._id}>
                  <td className="text-center">{++ranking}</td>
                  <td>
                    <img style={gordImage} src={vote.img} alt={vote.name} />
                    {vote.name} <br></br>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="custom-button" onClick={() => routeChangeGords()}>
            rate the gords again
          </button>
        </>
      )}
    </div>
  );
};
export default SubmitComplete;
