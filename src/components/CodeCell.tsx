import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { updateCell } = useActions();



  // Bundle the code every 1000 ms, only if the input has changed
  // @@TODO: Add a loading spinner, and possibly allow a greater delay before bundling
  useEffect(() => {
    const timer = setTimeout(async () => {
      // output = { code: string, error: string }
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    // when you return a function from useEffect, it will be called when the component is about to be re-rendered
    // this is a cleanup function - will be resetting the timer every time the input changes
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingError={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
