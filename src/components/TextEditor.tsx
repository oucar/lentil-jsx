import "./styles/textEditor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  // @@TODO: For demo - need a better solution than hardcoding the initial value
  const [value, setValue] = useState(
    `# Header\n ### Todo List\n - drink water\n - keep practicing`
  );

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // clicking inside the text editor
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      // clicking outside the text editor will close the editor
      setEditing(false);
    };
    // add the event listener to the document
    document.addEventListener("click", listener, { capture: true });

    // remove the event listener when the component is about to be re-rendered
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  //   toggle the editing state
  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
