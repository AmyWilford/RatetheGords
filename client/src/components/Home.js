import React from "react";
import Gord from "./Gord";

export default function Home() {
  return (
    <div>
      <h1 className="text-center">Rate the Gords</h1>
      <div className="container">
        <Gord />
      </div>
    </div>
  );
}
