import React, { useState } from "react";
import Gord from "./Gord";
import Modal from "./Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="custom-bg">
        <h1 className="text-center pb-0">Rate the Gords</h1>
        <div className="d-flex justify-content-end">
          <button onClick={() => setIsOpen(true)}>POWER RANKINGS</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          </Modal>
        </div>
      </div>
      <div>
        <Gord />
      </div>
    </div>
  );
}
