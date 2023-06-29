import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography, Paper, Stack } from "@mui/material";

import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  noteInstance,
  createdNote,
  fetchNotes,
  INote,
} from "../app/features/noteSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((store) => store.note);
  const { token } = useAppSelector((store) => store.user);

  const handleCreate = () => {
    noteInstance
      .post("/create", {}, { headers: { Authorization: "Bearer " + token } })
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
  }, []);

  return (
    <>
      <section className="container mx-auto pt-4 px-4">
        <Typography variant="h6" gutterBottom>
          My notes
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {notes.map((note) => {
            return (
              <button
                key={note._id}
                onClick={() => navigate(`/edit/${note._id}`)}
              >
                <Paper sx={{ p: 1, width: "150px", height: "180px" }}></Paper>
                <Typography variant="body2" textAlign="left">
                  {note.title || "Untitled"}
                </Typography>
              </button>
            );
          })}
        </Stack>
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
