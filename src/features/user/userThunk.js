import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    // const resp = await customFetch.patch(url, user, {
    //   headers: {
    //     //                               entireState->userSlice->userPropertyofSlice->token
    //     authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //   },
    // });
    return resp.data;
  } catch (err) {
    console.log(err.response);
    if (err.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging out ...");
    }
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
};
