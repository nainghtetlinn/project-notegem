import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import config from "../../config/config";
import { RootState } from "../store";
export const noteInstance = axios.create({
  baseURL: config.server + "/api/note",
});

export interface INote {
  _id?: string;
  title?: string;
  content?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface INoteState {
  notes: INote[];
  loading: boolean;
  error: string;
  current: INote;
}

const initialNoteState: INoteState = {
  notes: [],
  loading: false,
  error: "",
  current: {
    title: "",
    content: "",
  },
};

export const fetchNotes = createAsyncThunk(
  "note/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { user } = state;
    try {
      const { data } = await noteInstance.get("/", {
        headers: { Authorization: "Bearer " + user.token },
      });
      return data as INote[];
    } catch (error) {
      const err = error as AxiosError;
      const { message } = err.response?.data as any;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: initialNoteState,
  reducers: {
    createdNote: (state, action: PayloadAction<INote>) => {
      state.current = action.payload;
    },
    updatedNote: (state, action: PayloadAction<INote>) => {
      state.current = action.payload;
    },
    loadedNote: (state, action: PayloadAction<INote>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.notes = action.payload;
    });

    builder.addCase(fetchNotes.rejected, (state, action) => {
      const response = action.payload as { message: string };

      state.loading = false;
      state.error = response.message || "Cannot fetch notes";
    });
  },
});

export const { createdNote, updatedNote, loadedNote } = noteSlice.actions;
export default noteSlice.reducer;
