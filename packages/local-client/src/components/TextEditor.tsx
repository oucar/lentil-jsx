import "./styles/textEditor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  const { updateCell } = useActions();

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

  // toggle the editing state
  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
