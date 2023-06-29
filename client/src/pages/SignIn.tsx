import btnFocus from "../assets/signin_dark_focus.png";
import btnNormal from "../assets/signin_dark_normal.png";
import btnPressed from "../assets/signin_dark_pressed.png";

import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../config/firebase";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        enqueueSnackbar("Signed in successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err: FirebaseError) => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Paper sx={{ p: 2 }}>
        <Typography
          gutterBottom
          className="flex items-center justify-center gap-1"
        >
          Sign in to
          <Typography component="span" color="primary" fontWeight={600}>
            NoteGem
          </Typography>
        </Typography>
        <button className="group" onClick={handleSignIn}>
          <img
            src={btnNormal}
            alt="google_btn_normal"
            width={200}
            className="block group-hover:hidden group-active:hidden"
          />
          <img
            src={btnFocus}
            alt="google_btn_focus"
            width={200}
            className="hidden group-hover:block group-active:hidden"
          />
          <img
            src={btnPressed}
            alt="google_btn_pressed"
            width={200}
            className="hidden group-hover:hidden group-active:block"
          />
        </button>
      </Paper>
    </div>
  );
};

export default SignIn;
