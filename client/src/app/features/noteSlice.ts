import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
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
  recentNotes: INote[];
  loading: boolean;
  error: string;
  current: INote;
}

const initialNoteState: INoteState = {
  notes: [],
  recentNotes: [],
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

export const fetchRecentNotes = createAsyncThunk(
  "note/recent/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { user } = state;
    try {
      const { data } = await noteInstance.get("/recent", {
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
    deletedNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.notes = state.notes.filter((note) => note._id !== id);
      state.recentNotes = state.recentNotes.filter((note) => note._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.notes = action.payload;
    });

    builder.addCase(fetchRecentNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.recentNotes = action.payload;
    });

    builder.addMatcher(
      isAnyOf(fetchNotes.pending, fetchRecentNotes.pending),
      (state) => {
        state.loading = true;
        state.error = "";
      }
    );

    builder.addMatcher(
      isAnyOf(fetchNotes.rejected, fetchRecentNotes.rejected),
      (state, action) => {
        const response = action.payload as { message: string };

        state.loading = false;
        state.error = response.message || "Cannot fetch notes";
      }
    );
  },
});

export const { loadedNote, createdNote, updatedNote, deletedNote } =
  noteSlice.actions;
export default noteSlice.reducer;
