import axios from "axios"

const hotelApi =
  process.env.NODE_ENV === "production"
    ? "/api/hotels"
    : "http://localhost:8000/api/hotels"

export const addHotel = async (newHotel) => {
  try {
    const { data } = await axios.post(hotelApi, newHotel, {
      headers: {
        authorization: window.sessionStorage.getItem("accessJWT"),
      },
    })
    return data
  } catch (error) {
    return error.response.data
  }
}
