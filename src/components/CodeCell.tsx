import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Bundle the code every 1000 ms, only if the input has changed
  // @@TODO: Add a loading spinner, and possibly allow a greater delay before bundling
  useEffect(() => {
    const timer = setTimeout(async () => {

      // output = { code: string, error: string }
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    // when you return a function from useEffect, it will be called when the component is about to be re-rendered
    // this is a cleanup function - will be resetting the timer every time the input changes
    return () => {
      clearTimeout(timer);
    };

  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingError={error}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;
