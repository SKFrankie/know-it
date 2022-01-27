import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return <ReactConfetti numberOfPieces={600} width={width} height={height} recycle={false} />;
};

export default Confetti;
