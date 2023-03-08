import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getAllVotes } from "../utils/API";

import "./styles.css";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px",
  zIndex: 1000,
  color: "#000000",
  backgroundColor: "#F2f2f2",
  opacity: 0.9,
  height: 'auto',
  maxHeight: "80vh",
  overflow: "auto",
  fontSize: "14px",
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

const powerRankingsStyle = {};

const Modal = ({ open, children, onClose }) => {
  const [allVotes, setAllVotes] = useState([]);

  const getVotes = async () => {
    try {
      const response = await getAllVotes();
      console.log(response);
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      sortData(data);
    } catch (err) {
      console.error(err);
    }
  };
  let ranking = 0;
  const sortData = (data) => {
    let sortedData = data.sort((a, b) => a.vote_sum - b.vote_sum).reverse();
    console.log(sortedData);
    setAllVotes(sortedData);
    console.log(allVotes);
  };

  useEffect(() => {
    getVotes();
  }, [open]);

  if (!open) return null;
  return (
    <div>
      <div style={overlayStyle}></div>
      <div style={modalStyle}>
        <div className="d-flex justify-content-end pb-3">
          <RiCloseLine onClick={onClose} />
        </div>
        {children}
        <table>
          <tbody>
            <tr>
              <th>RANKING</th>
              <th>GORD</th>
              <th>TOTAL VOTES</th>
            </tr>
            {allVotes.map((vote) => (
              <tr key={vote._id}>
                <td className="text-center">{++ranking}</td>
                <td>
                  {vote.name} <br></br>
                </td>
                <td>{vote.vote_sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
