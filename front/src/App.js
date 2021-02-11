import "./App.css";
import Home from "./components/home/Home";
import { React, useState, useEffect } from "react";
import CodeInterface from "./components/code-interface/CodeInterface";
import { URL } from "./env";

let x;
const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [motif, setMotif] = useState([1, 8, 5, 6]);
  const [userInput, setUserInput] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [scores, setScores] = useState();
  const [timer, setTimer] = useState(0);
  const [username, setUsername] = useState();
  const end = async () => {
    clearInterval(x);
    setIsPlaying(false);
    setIsFinished(true);
    const data = {
      score: "" + timer,
      username: username,
    };
    const response = await fetch(URL + "scores", {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });
    const da = await response.json();
    setUsername("");
    setTimer(0);
    fetchData();
  };

  const fetchData = async () => {
    const response = await fetch(URL + "scores", config);
    const data = await response.json();
    const filtered = data.sort((a, b) => Number.parseInt(a.score) - Number.parseInt(b.score));
    setScores(filtered);
    const resp = await fetch(URL + "schemas", config);
    const schemas = await resp.json();
    const str = (Math.random() * schemas.length - 1).toString().split(".")[0];
    setMotif(schemas[Number.parseInt(str)].motif);
  };
  const start = (play) => {
    setIsPlaying(play);
    setCurrentStep(1);
    x = setInterval(() => {
      setTimer((time) => time + 1);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (error == true) {
      //component will not be re rendered if user fail at first step
      //see relaunch button for relaunch child useEffect
      setUserInput([]);
      setCurrentStep(0);
    }
  }, [error]);
  useEffect(() => {
    if (userInput.length > 0) {
      let error = false;
      if (userInput[userInput.length - 1] != motif[userInput.length - 1]) {
        error = true;
      }
      setError(error);

      if (!error && userInput.length == currentStep) {
        if (currentStep == motif.length) {
          console.log("partie terminer");
          end();
        } else {
          setCurrentStep((curr) => curr + 1);
        }
        setUserInput([]);
      }
    }
  }, [userInput]);

  return (
    <div className="App">
      <div>{timer}</div>
      {isFinished && <div>Felicitation vous avez terminer le simon</div>}
      {!isPlaying ? (
        <Home
          passPlaying={(play) => {
            start(play);
          }}
          passUsername={(username) => {
            setUsername(username);
          }}
          usern={username}
          childScores={scores}
        />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <CodeInterface step={currentStep} schema={motif} isClickable={false} />
          <CodeInterface
            step={currentStep}
            addCase={(keycase) => {
              setUserInput([...userInput, keycase]);
            }}
            isClickable={true}
            input={userInput}
          />
          <div>votre code secret est : {userInput.join(" ")}</div>
          <div>
            etape {currentStep}/ {motif.length}
          </div>
          {currentStep == 0 && (
            <div
              onClick={(e) => {
                setCurrentStep(1);
                setError(false);
              }}
              style={{ width: "100px", height: "50px", backgroundColor: "red", color: "white" }}
            >
              relancer
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
