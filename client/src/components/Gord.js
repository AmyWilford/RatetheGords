import React, { useState, useEffect } from "react";
import { getGords } from "../utils/API";

// export default function Gord() {
const Gord = () => {
  const [allGords, setAllGords] = useState([]);

  useEffect(() => {
    const getTheGords = async () => {
      try {
        const response = getGords();
        console.log(response);
        if (!response.ok) {
          throw new Error("could not fetch the gords");
        }

        const { items } = await response.json();

        const gordData = items.map((gord) => ({
          gordId: gord._id,
          name: gord.name,
          bio: gord.bio,
        }));
        setAllGords(gordData);
      } catch (err) {
        console.error(err);
      }
    };
    getTheGords();
  }, []);

  return (
    <div>
      <h1>we are gords</h1>
      <p>{allGords.length}</p>
      {/* show the number of gords to prove that info is actually pulling. Will access details later */}
    </div>
  );
};

// const [allGords, setAllGords] = useState([]);

// useEffect(() => {
//   const getGordData = async () => {
//     const response = await getGords();

//     if (!response.ok) {
//       throw new Error("could not get the gords");
//     }
//     const gords = await response.json();
//     setAllGords(gords);
//     console.log("this worked");
//   };
//   getGordData();
// });
export default Gord;
