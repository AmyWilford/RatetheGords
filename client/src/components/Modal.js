import React from "react";
import { RiCloseLine } from "react-icons/ri";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "50px",
  zIndex: 1000,
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

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STLYE}></div>
      <div style={MODAL_STYLES}>
        <RiCloseLine onClick={onClose} />
        {children}
      </div>
    </>
  );
}
