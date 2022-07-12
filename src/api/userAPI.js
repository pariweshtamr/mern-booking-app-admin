import axios from "axios"

const userApi =
  process.env.NODE_ENV === "production"
    ? "/api/auth"
    : "http://localhost:8000/api/auth"

export const loginUser = async (loginInfo) => {
  try {
    const { data } = await axios.post(userApi + "/login", loginInfo)
    return data
  } catch (error) {
    return error.response.data
  }
}

export const logoutUser = async (tokens) => {
  try {
    const { data } = await axios.post(userApi + "/logout", tokens)
    return data
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: "Error, unable to process your request. Please try again later.",
    }
  }
}
