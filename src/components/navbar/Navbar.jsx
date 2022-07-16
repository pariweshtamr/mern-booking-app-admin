import "./navbar.scss"
import {
  SearchOutlined,
  DarkModeOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { toggle } from "../../redux/DarkMode/DarkModeSlice"

const Navbar = () => {
  const { dispatch } = useDispatch()
  const { user } = useSelector((state) => state.user)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlined
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(toggle())}
            />
          </div>

          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>

          <div className="item">
            <img
              src={
                user?.img ? user?.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              }
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
