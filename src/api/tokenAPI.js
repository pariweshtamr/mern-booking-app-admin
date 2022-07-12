import axios from "axios"

export const getNewAccessJWT = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/token", {
      headers: {
        authorization: window.localStorage.getItem("refreshJWT"),
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
