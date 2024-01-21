import { configureStore } from "@reduxjs/toolkit";
// this userSlice is the slice reducer that we exported
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
