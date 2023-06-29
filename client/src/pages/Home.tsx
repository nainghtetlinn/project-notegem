import AddIcon from "@mui/icons-material/Add";
import NoteIcon from "@mui/icons-material/Note";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fab, Typography, Stack, IconButton, Divider } from "@mui/material";
import LoadingNotes from "../components/Helper/LoadingNotes";

import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  noteInstance,
  fetchNotes,
  fetchRecentNotes,
  createdNote,
  deletedNote,
  INote,
} from "../app/features/noteSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notes, recentNotes, loading, error } = useAppSelector(
    (store) => store.note
  );
  const { token } = useAppSelector((store) => store.user);

  const handleDelete = (id?: string) => {
    if (!id || !token) return;
    noteInstance
      .delete(`/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const data = res.data as { _id: string };
        dispatch(deletedNote(data._id));
      })
      .catch((err: AxiosError) => {
        const response = err.response?.data as { message: string };
        const message = response.message || "Something went wrong";
        enqueueSnackbar(message);
      });
  };

  const handleCreate = () => {
    noteInstance
      .post("/", {}, { headers: { Authorization: "Bearer " + token } })
      .then((res) => {
        const data = res.data as INote;
        dispatch(createdNote(data));
        navigate(`/edit/${data._id}`);
      })
      .catch((err: AxiosError) => {
        const response = err.response?.data as { message: string };
        const message = response.message || "Something went wrong";
        enqueueSnackbar(message);
      });
  };

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchRecentNotes());
  }, []);

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: "error" });
  }, [error]);

  if (loading) {
    return <LoadingNotes />;
  }

  return (
    <>
      <section className="container mx-auto max-w-lg">
        <div className="pt-4 px-4">
          <Typography variant="h6" gutterBottom>
            Recent
          </Typography>
          <Stack gap={1}>
            {recentNotes.map((note) => {
              return (
                <div
                  key={note._id}
                  className="flex items-center justify-between"
                >
                  <button
                    onClick={() => navigate(`/edit/${note._id}`)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <NoteIcon />
                    <Typography variant="body2" textAlign="left">
                      {note.title || "Untitled"}
                    </Typography>
                  </button>
                  <IconButton onClick={() => handleDelete(note._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              );
            })}
          </Stack>
        </div>

        <Divider />

        <div className="pt-4 px-4">
          <Typography variant="h6" gutterBottom>
            My notes
          </Typography>
          <Stack gap={1}>
            {notes.map((note) => {
              return (
                <div
                  key={note._id}
                  className="flex items-center justify-between"
                >
                  <button
                    onClick={() => navigate(`/edit/${note._id}`)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <NoteIcon />
                    <Typography variant="body2" textAlign="left">
                      {note.title || "Untitled"}
                    </Typography>
                  </button>
                  <IconButton onClick={() => handleDelete(note._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              );
            })}
          </Stack>
        </div>
      </section>
      <div className="fixed bottom-4 right-4">
        <Fab color="primary" onClick={handleCreate}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default Home;
