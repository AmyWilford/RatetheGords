import React, { useState, useEffect } from "react";
import { getGords } from "../utils/API";

// export default function Gord() {
const Gord = () => {
  const [allGords, setAllGords] = useState([]);

  const getTheGords = async () => {
    try {
      const response = await getGords();
      console.log(response);
      if (!response.ok) {
        throw new Error("could not fetch the gords");
      }
      let data = await response.json();
      console.log(data);
      console.log(data[0].name);
      // const { items } = await response.json();

      // const gordData = items.map((gord) => ({
      //   gordId: gord._id,
      //   name: gord.name,
      //   bio: gord.bio,
      // }));

      setAllGords(data);
      console.log(allGords);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getTheGords();
  }, []);

  return (
    <div>
      <h1>{allGords.length}</h1>
        <div>
            {allGords.map((gord)=>(
                <div>

                <p>{gord.name}</p>
                <p>{gord.bio}</p>
                </div>
            ))}
        </div>
      {/* show the number of gords to prove that info is actually pulling. Will access details later */}
    </div>
  );
};
export default Gord;
