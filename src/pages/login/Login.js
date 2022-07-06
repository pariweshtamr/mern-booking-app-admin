import { useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userLogin } from "../../redux/User/UserAction"
import "./login.scss"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const uRef = useRef()
  const passRef = useRef()
  const { isLoading, error } = useSelector((state) => state.user)
  const [show, setShow] = useState(false)

  const handleOnClick = async (e) => {
    e.preventDefault()

    const username = uRef.current?.value
    const password = passRef.current?.value

    dispatch(userLogin({ username, password })) && navigate("/")
  }

  return (
    <div className="login">
      <Container className="login-container">
        <div className="circle circle-one"></div>

        <div className="form-container">
          <img
            src="/images/illustration.png"
            className="illustration"
            alt="illustration"
          />

          <h1>LOGIN</h1>

          <div className="login-form">
            {error && <span className="text-danger">{error.message}</span>}

            <input
              type="text"
              placeholder="USERNAME"
              id="username"
              className="login-input"
              ref={uRef}
            />
            <div className="pass-group">
              <input
                type={show ? "text" : "password"}
                placeholder="PASSWORD"
                id="password"
                className="login-input"
                ref={passRef}
              />
              <button
                className="showPass-btn"
                onClick={() => {
                  setShow(!show)
                }}
              >
                {!show ? (
                  <i className="far fa-eye" />
                ) : (
                  <i
                    className="far fa-eye-slash"
                    onClick={() => setShow(show)}
                  />
                )}
              </button>
            </div>
            <button
              disabled={isLoading}
              className="bttn login-btn"
              onClick={handleOnClick}
            >
              Submit
            </button>

            <div className="links">
              <Link to="/register" className="bttn reg-btn">
                Register
              </Link>
              <Link to="/forgot-password" className="bttn forgot-btn">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </Container>
    </div>
  )
}

export default Login
