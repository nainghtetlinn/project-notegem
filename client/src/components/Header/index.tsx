import SearchIcon from "@mui/icons-material/Search";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import { DropMenu } from "./DropMenu";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { toggleMode } from "../../app/features/themeSlice";

export const Header = () => {
  const { mode } = useAppSelector((store) => store.theme);
  const { user } = useAppSelector((store) => store.user);
  const { avatar, name } = user;
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="container mx-auto flex items-center justify-between">
            <Typography variant="h6">NoteGem</Typography>
            <ul className="flex items-center gap-1">
              <li>
                <IconButton size="small" color="inherit">
                  <SearchIcon />
                </IconButton>
              </li>
              <li>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => dispatch(toggleMode())}
                >
                  {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </li>
              <li>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  {avatar ? (
                    <Avatar
                      src={avatar}
                      alt={name || "Username"}
                      sx={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 24, height: 24 }} />
                  )}
                </IconButton>
              </li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
      <DropMenu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      />
    </>
  );
};
