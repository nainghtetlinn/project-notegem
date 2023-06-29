import { lazy, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { auth } from "./config/firebase";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { IUser, logIn } from "./app/features/userSlice";

import { Header } from "./components/Header";
import Loadable from "./components/Helper/Loadable";
import MainLoading from "./components/Helper/MainLoading";

const SignIn = Loadable(lazy(() => import("./pages/SignIn")));
const Home = Loadable(lazy(() => import("./pages/Home")));
const Edit = Loadable(lazy(() => import("./pages/EditDiary")));

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((store) => store.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const userData: IUser = {
          uid: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
          email: user.email,
        };
        dispatch(logIn({ token, user: userData }));
      } else {
        navigate("/signin");
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <MainLoading />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/edit/:id"
          element={token ? <Edit /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={token ? <Navigate to="/" /> : <SignIn />}
        />
      </Routes>
    </>
  );
}

export default App;
