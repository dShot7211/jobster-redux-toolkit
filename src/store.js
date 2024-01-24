import { configureStore } from "@reduxjs/toolkit";
// this userSlice is the slice reducer that we exported
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import alljobsSlice from "./features/allJobs/alljobsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: alljobsSlice,
  },
});
