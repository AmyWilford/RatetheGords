import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getAllVotes } from "../utils/API";
import "./styles.css";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  margin: "20xp 0px",
  color: "#000000",
  backgroundColor: "#F2f2f2",
  height: "auto",
  maxHeight: "90vh",
  overflow: "auto",
  fontSize: "14px",
  display: "flex",
  flexDirection: "column",
};
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, 0.7)",
  zIndex: 1000,
};

const styledTopGord = {
  borderRadius: "50%",
  width: "85px",
};

const gordImage = {
  borderRadius: "50%",
  width: "25px",
  marginRight: ".5rem",
};

const Modal = ({ open, children, onClose }) => {
  const [allVotes, setAllVotes] = useState([]);
  const [voteTotal, setVoteTotal] = useState(0);

  let ranking = 0;

  const getVotes = async () => {
    try {
      const response = await getAllVotes();
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      sortData(data);
      setVoteTotal(data[0].votes.length);
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
  }, [open]);

  if (!open) return null;
  return (
    <div>
      <div style={overlayStyle}></div>
      <div style={modalStyle} className="responsiveTable">
        <div className="d-flex justify-content-end pb-3 pr-2 closeContainer">
          <RiCloseLine className="closeIcon" onClick={onClose} />
        </div>
        {children}
        <div className="d-flex flex-column align-items-center my-3">
          <h5>Canada's Top Gord is...</h5>
          <img style={styledTopGord} src={allVotes[0].img}></img>
          <h5>{allVotes[0].name}</h5>
        </div>
        <table>
          <tbody>
            <tr>
              <th colSpan="3" className="text-center">
                Gord Power Rankings<br></br>
                <small className="pt-3 text-right pb-4">Total votes placed: {voteTotal} </small>
              </th>
            </tr>
            <tr>
              <th className="text-center">RANK</th>
              <th>GORD</th>
            </tr>
            {allVotes.map((vote, index) => (
              <tr key={vote._id}>
                <td className="text-center">{++ranking}</td>
                <td>
                  <img style={gordImage} src={vote.img}></img>
                  {vote.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
