import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  uid?: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}

interface IUserState {
  user: IUser;
  token?: string;
}

const initialUser: IUser = {
  uid: "",
  name: "",
  email: "",
  avatar: "",
};

const initialUserState: IUserState = {
  user: initialUser,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logOut: (state) => {
      state.user = initialUser;
      state.token = "";
    },
    logIn: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
