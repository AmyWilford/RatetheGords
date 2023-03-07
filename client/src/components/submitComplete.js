import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitComplete = () => {
  const navigate = useNavigate();

  const routeChangeGords = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <>
      <div>Thanks for submitting your vote</div>
      <button onClick={() => routeChangeGords()}></button>;
    </>
  );
};
export default SubmitComplete;
