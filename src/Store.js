import { configureStore } from "@reduxjs/toolkit"
import darkModeReducer from "./redux/DarkMode/DarkModeSlice"
import userReducer from "./redux/User/UserSlice"

const Store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    user: userReducer,
  },
})

export default Store
