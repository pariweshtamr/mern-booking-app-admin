import { loginUser } from "../../api/userAPI"
import { loginFail, loginSuccess, respondPending } from "./UserSlice"

export const userLogin = (loginInfo) => async (dispatch) => {
  dispatch(respondPending())

  // CALL API TO LOGIN
  const data = await loginUser(loginInfo)

  if (data?.status === "success") {
    return dispatch(loginSuccess(data))
  }

  dispatch(loginFail(data))
}
