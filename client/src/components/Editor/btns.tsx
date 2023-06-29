import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import {
  isBold,
  isItalic,
  isUnderline,
  isUL,
  isOL,
  isTextCenterAligned,
  isTextLeftAligned,
  isTextRightAligned,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  toggleUL,
  toggleOL,
  toggleTextAlign,
} from "contenido";
import { EditorState } from "draft-js";

interface IBtn {
  icon: any;
  style?: string;
  detector: (e: EditorState) => boolean;
  toggle: (e: EditorState, s: (e: EditorState) => void, style?: string) => void;
}

export const inlineBtns: IBtn[] = [
  {
    icon: <FormatBoldIcon />,
    style: "BOLD",
    detector: isBold,
    toggle: toggleBold,
  },
  {
    icon: <FormatItalicIcon />,
    style: "ITALIC",
    detector: isItalic,
    toggle: toggleItalic,
  },
  {
    icon: <FormatUnderlinedIcon />,
    style: "UNDERLINE",
    detector: isUnderline,
    toggle: toggleUnderline,
  },
];

export const blockBtns: IBtn[] = [
  {
    icon: <FormatListBulletedIcon />,
    style: "unordered-list-item",
    detector: isUL,
    toggle: toggleUL,
  },
  {
    icon: <FormatListNumberedIcon />,
    style: "ordered-list-item",
    detector: isOL,
    toggle: toggleOL,
  },
];

export const alignBtns: IBtn[] = [
  {
    icon: <FormatAlignLeftIcon />,
    style: "text-align-left",
    detector: isTextLeftAligned,
    toggle: toggleTextAlign,
  },
  {
    icon: <FormatAlignCenterIcon />,
    style: "text-align-center",
    detector: isTextCenterAligned,
    toggle: toggleTextAlign,
  },
  {
    icon: <FormatAlignRightIcon />,
    style: "text-align-right",
    detector: isTextRightAligned,
    toggle: toggleTextAlign,
  },
];

interface IUndoRedo {
  icon: any;
  detector: (editorState: EditorState) => boolean;
  handler: (
    editorState: EditorState,
    setEditorState: (e: EditorState) => void
  ) => void;
}

export const undoredo: IUndoRedo[] = [
  {
    icon: <UndoIcon />,
    detector: (editorState) => {
      const undoStack = editorState.getUndoStack();
      return undoStack.size === 0;
    },
    handler: (editorState, setEditorState) => {
      setEditorState(EditorState.undo(editorState));
    },
  },
  {
    icon: <RedoIcon />,
    detector: (editorState) => {
      const redoStack = editorState.getRedoStack();
      return redoStack.size === 0;
    },
    handler: (editorState, setEditorState) => {
      setEditorState(EditorState.redo(editorState));
    },
  },
];
