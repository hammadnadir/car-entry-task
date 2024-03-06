"use client";
import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import jsonloader from "../../public/loading.json";

function LoaderScreen() {
  const animationRef = useRef();

  return (
    <div className="z-[100] h-[100vh] flex bg-black bg-opacity-50 justify-center items-center fixed top-0 w-full">
      <Lottie
        animationData={jsonloader}
        style={{ width: "300px", margin: "auto" }}
        loop
        autoplay
        renderer="svg"
        ref={animationRef}
      />
    </div>
  );
}

export default LoaderScreen;
