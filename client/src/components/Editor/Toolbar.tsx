import { IconButton, Divider, Stack } from "@mui/material";
import { EditorState } from "draft-js";

import { alignBtns, blockBtns, inlineBtns, undoredo } from "./btns";

export const Toolbar = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: (s: EditorState) => void;
}) => {
  return (
    <>
      <Stack direction="row" p={0.5} flexWrap="wrap">
        <div>
          {inlineBtns.map(({ icon, detector, toggle }, i) => (
            <IconButton
              key={i}
              color={detector(editorState) ? "primary" : "default"}
              onClick={(e) => {
                e.preventDefault();
                toggle(editorState, setEditorState);
              }}
            >
              {icon}
            </IconButton>
          ))}
        </div>
        <Divider orientation="vertical" flexItem sx={{ m: 0.5 }} />

        <div>
          {blockBtns.map(({ icon, detector, toggle }, i) => (
            <IconButton
              key={i}
              color={detector(editorState) ? "primary" : "default"}
              onClick={(e) => {
                e.preventDefault();
                toggle(editorState, setEditorState);
              }}
            >
              {icon}
            </IconButton>
          ))}
        </div>
        <Divider orientation="vertical" flexItem sx={{ m: 0.5 }} />

        <div>
          {alignBtns.map(({ icon, style, detector, toggle }, i) => (
            <IconButton
              key={i}
              color={detector(editorState) ? "primary" : "default"}
              onClick={(e) => {
                e.preventDefault();
                toggle(editorState, setEditorState, style);
              }}
            >
              {icon}
            </IconButton>
          ))}
        </div>
        <Divider orientation="vertical" flexItem sx={{ m: 0.5 }} />

        <div>
          {undoredo.map(({ icon, detector, handler }, i) => (
            <IconButton
              key={i}
              color="primary"
              disabled={detector(editorState)}
              onClick={(e) => {
                e.preventDefault();
                handler(editorState, setEditorState);
              }}
            >
              {icon}
            </IconButton>
          ))}
        </div>
      </Stack>
      <Divider />
    </>
  );
};
