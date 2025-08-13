import React, { useState, useEffect } from "react";

const NotFoundMsg = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, 100); // 100ms per letter
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        marginTop: "40px",
        color: "rgb(175, 125, 125)",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "1.5",
        whiteSpace: "pre-line",
      }}
    >
      {displayText}
    </div>
  );
};

export default function App() {
  return (
    <NotFoundMsg text={"  Oops! We couldn’t find a mess to match your taste here —\nTry another location for your next delicious bite! "} />
  );
}
