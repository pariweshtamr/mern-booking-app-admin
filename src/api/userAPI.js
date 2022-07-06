import axios from "axios"

export const loginUser = async (loginInfo) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/auth/login",
      loginInfo
    )
    return data
  } catch (error) {
    return error.response.data
  }
}
