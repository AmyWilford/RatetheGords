import React, { useState } from "react";
import Gord from "./Gord";
import Modal from "./Modal";

const headerStyles = {
  backgroundColor: "#ED452B",
  color: "white",
  position: "fixed",
  width: "100%",
  zIndex: 10,
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div style={headerStyles}>
        <h1 className="text-center pb-0">Rate the Gords</h1>
        <div className="d-flex powerrankings-bar">
          <button className="custom-button" onClick={() => setIsOpen(true)}>
            POWER RANKINGS
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
        </div>
      </div>
      <div>
        <Gord />
      </div>
    </div>
  );
}
