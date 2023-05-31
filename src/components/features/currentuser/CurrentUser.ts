import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUserState {
  //   id: number | null;
  username: string | null;
  password: string | null;
}

const initialState: CurrentUserState = {
  //   id: null,
  username: null,
  password: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    updateCurrentUser: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const { username, password } = action.payload;
      //   state.id = id;
      state.username = username;
      state.password = password;
    },
  },
});

export const { updateCurrentUser } = currentUserSlice.actions;
export const CurrentUserReducer = currentUserSlice.reducer;
