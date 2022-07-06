import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    respondPending: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
      state.isLoading = false
      state.error = null

      localStorage.setItem("user", JSON.stringify(payload))
    },
    loginFail: (state, { payload }) => {
      state.user = {}
      state.isLoading = false
      state.error = payload || {}
    },
    logoutSuccess: (state) => {
      state.user = {}
      state.isLoading = false
      state.error = false
    },
  },
})

const { reducer, actions } = userSlice

export const { respondPending, loginSuccess, loginFail } = actions

export default reducer
