import "draft-js/dist/Draft.css";
import "contenido/dist/styles.css";

import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";
import { Editor, blockStyleFn } from "contenido";
import { useState, useEffect } from "react";

import useDebounce from "../../hooks/useDebounce";
import { Toolbar } from "./Toolbar";
import { INote } from "../../app/features/noteSlice";

export const EditorEl = ({
  initialData,
  updateNote,
}: {
  initialData: INote | null;
  updateNote: (noteData: { title: string; content: string }) => void;
}) => {
  console.log(initialData);
  const [editorState, setEditorState] = useState(() => {
    try {
      if (initialData && initialData.content) {
        const content = JSON.parse(initialData.content) as RawDraftContentState;
        const contentState = convertFromRaw(content);
        return EditorState.createWithContent(contentState);
      }
      return EditorState.createEmpty();
    } catch (error) {
      return EditorState.createEmpty();
    }
  });
  const [title, setTitle] = useState(
    initialData && initialData.title ? initialData.title : ""
  );

  const debouncedEditorState = useDebounce(editorState, 500);
  const debouncedTitle = useDebounce(title, 500);

  const handleKeyCommand = (command: string, newState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(newState, command);
    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    updateNote({
      title,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    });
  }, [debouncedEditorState, debouncedTitle]);

  return (
    <>
      <section onMouseDown={(e) => e.preventDefault()}>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
      </section>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent focus:outline-none p-2 text-lg"
        />
      </div>

      <section className="p-2">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={blockStyleFn}
        />
      </section>
    </>
  );
};
