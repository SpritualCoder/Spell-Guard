"use client";
import { useState } from "react";
import { wagnerFischer } from "./wagnerFischer";
import dictionary from "@/data/dictionary";
export default function Home() {
  const [buttonName, setButtonName] = useState("Enable DarkMode");
  // const [buttonTextStyle, setButtonTextStyle] = useState({a:'Enable DarkMode', color: 'black'})
  const [textMode, setTextMode] = useState("dark");
  const [mode, setMode] = useState("light"); //Whether dark mode is enabled or not.
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setButtonName("Enable DarkMode");
      setTextMode("dark");
      // setButtonTextStyle({a: 'Enable DarkMode',color: 'black'});
    } else {
      setMode("dark");
      setButtonName("Enable LightMode");
      setTextMode("light");
      // setButtonTextStyle({a:'Enable LightMode',color: 'white'});
    }
    if (myStyle.color === "black") {
      newMyStyle({
        color: "white",
        backgroundColor: "black",
      });
      newMode("Enable Light Mode");
    } else {
      newMyStyle({
        color: "black",
        backgroundColor: "white",
      });
      newMode("Enable Dark Mode");
    }
  };
  const handleUpClick = () => {
    console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
  };
  const handleDownClick = () => {
    console.log("Lowercase was clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
  };
  const handleOnChange = (event) => {
    console.log("Uppercase was changed" + text);
    setText(event.target.value);
  };
  const [text, setText] = useState("Enter text here"); //Creates the state here.
  const [myStyle, newMyStyle] = useState({
    //Creating state with objects.
    color: "black",
    backgroundColor: "white",
  });
  const [oldMode, newMode] = useState("Enable Dark Mode");
  const handleCopyClick = () => {
    var text = document.getElementById("exampleFormControlTextarea1");
    text.select();
    navigator.clipboard.writeText(text.value);
  };
  const handleExtraSpace = () => {
    let newText = text.replace(/\s+/g, " ");
    setText(newText);
  };
  // const [text1, setText1] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const checkSpelling = () => {
    const words = text.split(" ");
    const newSuggestions = words.map((word) => {
      if (!dictionary.includes(word.toLowerCase())) {
        const closestMatch = dictionary.reduce((a, b) => {
          return wagnerFischer(word.toLowerCase(), a) <
            wagnerFischer(word.toLowerCase(), b)
            ? a
            : b;
        });
        return { word, suggestion: closestMatch };
      }
      return { word, suggestion: null };
    });
    setSuggestions(newSuggestions);
  };
  return (
    <>
      <div
        className="container mx-auto flex-wrap flex items-center"
        style={{ color: mode === "light" ? "black" : "white" }}
      >
        <div className="containe mx-auto text-center my-2">
          <textarea
            className="border-4 text-center"
            value={text}
            onChange={handleOnChange}
            id="exampleFormControlTextarea1"
            rows="10"
            cols="160"
            style={myStyle}
          ></textarea>
        </div>
        <div className="containe mx-auto text-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={checkSpelling}
        >
          Check Spelling
        </button>
        </div>
        <div className="suggestions container mx-auto text-center my-4">
          {suggestions.map(
            (s, index) =>
              s.suggestion && (
                <p key={index}>
                  Did you mean <b>{s.suggestion}</b> instead of <i>{s.word}</i>?
                </p>
              )
          )}
        </div>
        <div className="container mx-auto text-center my-4">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleUpClick}
        >
          Convert To Uppercase
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleDownClick}
        >
          Convert To lowercase
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleCopyClick}
        >
          Copy Text
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleExtraSpace}
        >
          Remove Extra Space
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={toggleMode}
        >
          {oldMode}
        </button>
        </div>
      </div>
      <div className="mx-auto text-center border-4">
        <h1>Your Text Summary is:-</h1>
        <p>
          No. of words = {text.split(" ").length} and No. of characters ={" "}
          {text.length}
        </p>
        <p>{0.008 * text.split(" ").length} minutes reading</p>
        <div className="border-2">
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
      </div>
    </>
  );
}
