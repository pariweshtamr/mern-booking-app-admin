import "./newUser.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import axios from "axios"
import { registerUser } from "../../api/userAPI"

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState({})

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInfo({
      ...info,
      [name]: value,
    })
  }

  const handleOnClick = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddbttkmhz/image/upload",
        data
      )

      const { url } = uploadRes.data

      const newUser = {
        ...info,
        img: url,
      }
      await registerUser(newUser)
    } catch (error) {
      console.log(error)
    }
    console.log(info)
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Username</label>
                <input type="text" onChange={handleOnChange} name="username" />
              </div>
              <div className="formInput">
                <label>Full Name</label>
                <input type="text" onChange={handleOnChange} name="fullName" />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="mail" onChange={handleOnChange} name="email" />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input type="text" onChange={handleOnChange} name="phone" />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  onChange={handleOnChange}
                  name="password"
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input type="text" onChange={handleOnChange} name="address" />
              </div>
              <div className="formInput">
                <label>City</label>
                <input type="text" onChange={handleOnChange} name="city" />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input type="text" onChange={handleOnChange} name="country" />
              </div>

              <button onClick={handleOnClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUser
