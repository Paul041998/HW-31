import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: savedAuth.isLoggedIn,
    user: savedAuth.user,
  },
  reducers: {
    login: (state, action) => {
      const { name, password } = action.payload;

      if (name === "admin" && password === "admin") {
        state.isLoggedIn = true;
        state.user = { name };

        localStorage.setItem(
          "auth",
          JSON.stringify({
            isLoggedIn: true,
            user: { name },
          })
        );
      } else {
        alert("Wrong username or password");
      }
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;

      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
