import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string | null;
  password: string | null;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // Add user slice
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.users.push(user);
    },
  },
});

export const { addUser } = userSlice.actions;
export const UserReducer = userSlice.reducer;
