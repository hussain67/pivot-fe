import React, { useState } from "react";
import { useEffect } from "react";
//import io from "socket.io-client";
//let socket = io.connect("http://localhost:9090");

const Pool = ({ socket }) => {
  const [yesCount, setYesCount] = useState(0);

  useEffect(() => {
    socket.on("reply", answer => {
      if (answer === "yes") {
        setYesCount(count => {
          return count + 1;
        });
      }
    });
  }, [socket]);
  console.log(yesCount);
  return <div>Pool page</div>;
};

export default Pool;
