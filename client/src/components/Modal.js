import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getGords, createVote, getSingleGord } from "../utils/API";
import "./styles.css";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "50px",
  zIndex: 1000,
  color: "#000000",
  backgroundColor: "#F2f2f2",
};
const OVERLAY_STLYE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, 0.7)",
  zIndex: 1000,
};

const Modal = ({ open, children, onClose }) => {
  const [allGords, setAllGords] = useState([]);
  const [allVotes, setAllVotes] = useState([]);

  const getTheGords = async () => {
    try {
      const response = await getGords();
      console.log(response);
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      setAllGords(data);
      allGords.forEach((el) => {
        getGordVoteTally(el._id);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getGordVoteTally = (id) => {
    try {
      const response = getSingleGord(id);
      console.log(id);
      if (!response.ok) {
        throw new Error("could not locate the gord");
      }
      let voteData = response.json();
      console.log(voteData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTheGords();
  }, []);
  console.log(allGords);

  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STLYE}></div>
      <div style={MODAL_STYLES}>
        <RiCloseLine onClick={onClose} />
        {children}
        {allGords.map((gord) => (
          <div key={gord._id} className="col-md-3 p-2">
            <p className="text-center gord-name">{gord.name}</p>
            {getGordVoteTally(gord._id)}
          </div>
        ))}
      </div>
    </>
  );
};

export default Modal;
