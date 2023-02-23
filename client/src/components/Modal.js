import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getGords, getAllVotes } from "../utils/API";
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
  // const [allGords, setAllGords] = useState([]);
  const [allVotes, setAllVotes] = useState([]);

  const getVotes = async () => {
    try {
      const response = await getAllVotes();
      console.log(response);
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      setAllVotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVotes();
  }, []);

  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STLYE}></div>
      <div style={MODAL_STYLES}>
        <RiCloseLine onClick={onClose} />
        {children}
        {allVotes.forEach((vote) => {
          console.log(vote.name + ": " + vote.vote_sum);
        })}
      </div>
    </>
  );
};

export default Modal;
