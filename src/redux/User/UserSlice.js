import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: false,
  isLoading: false,
  autoLoginLoading: false,
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
      state.user = payload || {}
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

      localStorage.clear()
    },
    autoLoginPending: (state, { payload }) => {
      state.autoLoginLoading = payload
    },
    loginAuto: (state) => {
      state.autoLoginLoading = false
      state.isLoggedIn = true
    },
  },
})

const { reducer, actions } = userSlice

export const {
  respondPending,
  loginSuccess,
  logoutSuccess,
  loginFail,
  loginAuto,
  autoLoginPending,
} = actions

export default reducer
