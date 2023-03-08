import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVotes } from "../utils/API";

const submitDivStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const SubmitComplete = () => {
  const [allVotes, setAllVotes] = useState([]);
  let ranking = 0;

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
    <div style={submitDivStyle}>
      <div>Thanks for submitting your vote</div>
      <div>See what Canada has to say</div>

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
        <button class="custom-button" onClick={() => routeChangeGords()}>
        go back to gords
      </button>
    </div>
  );
};
export default SubmitComplete;
