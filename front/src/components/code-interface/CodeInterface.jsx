import { React, useEffect, useState } from "react";
import { CodeBoard, KeyCase } from "./../../style/App.style";

const CodeInterface = (props) => {
  const { step, schema, input } = props;
  const [table, setTable] = useState(createTab());
  const [coloredKeyCase, setColoredKeyCase] = useState();
  const [colorKeyCase, setColorKeyCase] = useState();

  useEffect(() => {
    let i = 1;
    let interval = "";
    if (schema && step) {
      interval = setInterval(() => {
        setColoredKeyCase((val) => schema[i - 1]);
        setColorKeyCase((val) => {
          let color = "";
          if (i >= 2 && schema[i - 1] == schema[i - 2]) {
            color = "#" + Math.floor(Math.random() * 16777215).toString(16);
          }
          return color;
        });

        if (i > step) {
          setColoredKeyCase();
          setColorKeyCase((val) => "blue");
          clearInterval(interval);
        }
        i += 1;
      }, 600);
    }
    return () => clearInterval(interval);
  }, [step]);
  return (
    <>
      <CodeBoard>
        {table.map((keycase) => {
          return (
            <KeyCase
              keycase={coloredKeyCase && coloredKeyCase == keycase}
              color={colorKeyCase}
              onClick={
                props.isClickable
                  ? (e) => {
                      if (step && input.length < step) {
                        setColoredKeyCase(keycase);
                        props.addCase(keycase);
                      }
                    }
                  : () => ""
              }
              key={keycase}
            ></KeyCase>
          );
        })}
      </CodeBoard>
    </>
  );
};
const createTab = () => {
  let table = [];
  for (let i = 1; i <= 9; i++) {
    table.push(i);
  }
  return table;
};

export default CodeInterface;
