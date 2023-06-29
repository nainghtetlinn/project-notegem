import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  MenuProps,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../config/firebase";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logOut } from "../../app/features/userSlice";

export const DropMenu = (props: MenuProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth);
    dispatch(logOut());
  };

  return (
    <Menu
      {...props}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {!token && (
        <MenuItem onClick={() => navigate("/signin")}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText>SignIn</ListItemText>
        </MenuItem>
      )}
      {token && (
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      )}
    </Menu>
  );
};
