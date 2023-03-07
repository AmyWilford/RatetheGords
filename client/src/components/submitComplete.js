import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVotes } from "../utils/API";

const SubmitComplete = () => {
  const [allVotes, setAllVotes] = useState([]);

  const navigate = useNavigate();

  const routeChangeGords = () => {
    let path = `/`;
    navigate(path);
  };

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

  const sortData = (data) => {
    let sortedData = data.sort((a, b) => a.vote_sum - b.vote_sum).reverse();
    console.log(sortedData);
    setAllVotes(sortedData);
    console.log(allVotes);
  };

  useEffect(() => {
    getVotes();
  }, []);
  return (
    <>
      <div>Thanks for submitting your vote</div>
      <button onClick={() => routeChangeGords()}>go back to gords</button>;
      <div>
        {allVotes.map((vote) => (
          <div key={vote._id}>
            <span>{vote.name}:</span>
            <span>{vote.vote_sum}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default SubmitComplete;
