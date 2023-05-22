import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  userData: {},
  msg: {},
  token: "",
  loading: "",
  err: "",
};

export const signupUser = createAsyncThunk("signupUser", (payload) => {
  axios
    .post("https://gorest.co.in/public/v2/users", payload, {
      headers: {
        Authorization:
          "Bearer cc90a015d4379ec65b3ec6d244bb17bca286d1e2efe98230a6b41aa94a1efc6f ",
      },
    })
    .then((res) => {
      toast.success("signup successful");
      console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err.message);
    });
});
export const loginUser = createAsyncThunk("loginUser", (payload) => {
  axios
    .get(`https://gorest.co.in/public/v2/users/${payload.id}`, {
      headers: {
        Authorization:
          "Bearer cc90a015d4379ec65b3ec6d244bb17bca286d1e2efe98230a6b41aa94a1efc6f ",
      },
    })
    .then((res) => {
      toast.success("login successful");
      console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err.message);
      toast.error(err.message);
    });
});

export const deleteUser = createAsyncThunk("deleteUser", (payload) => {
  axios.delete(`https://gorest.co.in/public/v2/users/${payload.id}`, {
      headers: {
        Authorization:
          "Bearer cc90a015d4379ec65b3ec6d244bb17bca286d1e2efe98230a6b41aa94a1efc6f ",
      },
    })
    .then((res) => {
      toast.success("deleted successful");
      localStorage.clear();
    }).catch((err) => {
        toast.error(err.message);
    });
});

export const updateUser = createAsyncThunk("updateUser", (payload) => {
  axios
    .put(`https://gorest.co.in/public/v2/users/${payload.id}`, {
      name : payload.name,
      email : payload.email,
      gender : payload.gender,
      status : payload.status
    }, {
      headers: {
        Authorization:
          "Bearer cc90a015d4379ec65b3ec6d244bb17bca286d1e2efe98230a6b41aa94a1efc6f ",
      },
    })
    .then((res) => {
      toast.success("updated successful");
      console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
    })
    .catch((err) => {
      toast.error(err.message);
    });
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, payload) => {
      state.loading = false;
      state.userData = payload.userData;
      if (payload.err) {
        state.err = payload.err;
      } else {
        state.msg = payload.msg;
      }
    },

    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, payload) => {
      if (payload.err) {
        state.err = payload.err;
      } else {
        state.msg = payload.msg;
        state.userData = payload.userData;
      }
    },
    [loginUser.rejected]: (state) => {
      state.loading = true;
    },

    // update user
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, payload) => {
      if (payload.err) {
        state.err = payload.err;
      } else {
        state.msg = payload.msg;
        state.userData = payload.userData;
      }
    },
    [updateUser.rejected]: (state, payload) => {
      state.err = payload.err;
    },
    [deleteUser.fulfilled]: (state, payload) => {
      state.err = payload.err;
      state.userData = null;
    },    
    [deleteUser.rejected]: (state, payload) => {
      state.err = payload.err;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
