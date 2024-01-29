import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  (user, thunkAPI) => {
    // what ever we get back from the registerUserThunk func we return from the above func too
    // see the other approach job thunk
    return registerUserThunk(user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  (user, thunkAPI) => {
    // what ever we get back from the loginUserThunk func we return from the above func too

    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  (user, thunkAPI) => {
    // WE CAN GET ANY STATE VALUE OF ALL SLICES & CALL ANY REDUCER FUNCTION OF ANY SLICE OR ANY FUNCTION
    // console.log("thunAPI", thunkAPI);
    //
    // console.log("thunkAPI data", thunkAPI.getState());
    //
    // console.log("thunkAPI reducerfunctions", thunkAPI.dispatch());
    // thunkAPI.dispatch(toggleSidebar());

    // what ever we get back from the updateUserThunk func we return from the above func too
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = !state.isSidebarOpen;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(registerUser.fulfilled, (state, action) => {
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success("User Updated");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("There was an error...");
      });
  },
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
