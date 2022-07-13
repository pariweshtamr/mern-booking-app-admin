import { getNewAccessJWT } from "../../api/tokenAPI"
import { loginUser, logoutUser } from "../../api/userAPI"
import {
  autoLoginPending,
  loginAuto,
  loginFail,
  loginSuccess,
  logoutSuccess,
  respondPending,
} from "./UserSlice"

const setJWTinBrowserMemory = ({ accessJWT, refreshJWT }) => {
  window.sessionStorage.setItem("accessJWT", accessJWT)
  window.localStorage.setItem("refreshJWT", refreshJWT)
}

export const userLogin = (loginInfo) => async (dispatch) => {
  dispatch(respondPending())

  // CALL API TO LOGIN
  const data = await loginUser(loginInfo)
  if (data?.status === "success") {
    setJWTinBrowserMemory(data.jwts)
    return dispatch(loginSuccess(data.user))
  }

  dispatch(loginFail({ message: "You are not allowed!" }))
}

export const userLogout = () => async (dispatch) => {
  const accessJWT = window.sessionStorage.getItem("accessJWT")
  const refreshJWT = window.localStorage.getItem("refreshJWT")

  await logoutUser({ accessJWT, refreshJWT })

  window.sessionStorage.removeItem("accessJWT")
  window.localStorage.removeItem("refreshJWT")

  dispatch(logoutSuccess())
}

export const autoLogin = () => async (dispatch) => {
  dispatch(autoLoginPending(true))
  const accessJWT = window.sessionStorage.getItem("accessJWT")
  const refreshJWT = window.localStorage.getItem("refreshJWT")

  // 1. accessJWT exists
  if (accessJWT) {
    dispatch(loginAuto())
    return
  }

  // 2. accessJWT does not exist but refreshJWT exists
  if (!accessJWT && refreshJWT) {
    // Call api to get accessJWT
    const result = await getNewAccessJWT()
    if (result?.accessJWT) {
      window.sessionStorage.setItem("accessJWT", result.accessJWT)
      return dispatch(loginAuto())
    }
    dispatch(userLogout())
  }
}
