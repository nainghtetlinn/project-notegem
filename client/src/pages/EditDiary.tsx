import { Paper, CircularProgress } from "@mui/material";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

import { EditorEl } from "../components/Editor";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  noteInstance,
  updatedNote,
  loadedNote,
  INote,
} from "../app/features/noteSlice";

const EditDiary = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { token } = useAppSelector((store) => store.user);

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<INote | null>(null);

  const updateNote = (noteData: { title: string; content: string }) => {
    if (!id || !token) return;
    noteInstance
      .post(`/update/${id}`, noteData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const data = res.data as INote;
        dispatch(updatedNote(data));
      })
      .catch((err) => {
        const response = err.response?.data as { message: string };
        const message = response.message || "Something went wrong";
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const loadNote = () => {
    setLoading(true);
    noteInstance
      .get(`/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const data = res.data as INote;
        dispatch(loadedNote(data));
        setInitialData(data);
      })
      .catch((err) => {
        const response = err.response?.data as { message: string };
        const message = response.message || "Something went wrong";
        enqueueSnackbar(message, { variant: "error" });
        setInitialData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadNote();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-4">
      <Paper>
        <EditorEl initialData={initialData} updateNote={updateNote} />
      </Paper>
    </div>
  );
};

export default EditDiary;
