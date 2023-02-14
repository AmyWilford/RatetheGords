import React from "react";
import Gord from "./Gord";

export default function Home() {
  return (
    <div>
      <div className="custom-bg">
        <h1 className="text-center">Rate the Gords</h1>
      </div>
      <div>
        <Gord />
      </div>
    </div>
  );
}
