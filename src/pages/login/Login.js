import { useEffect, useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { userLogin } from "../../redux/User/UserAction"
import "./login.scss"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const uRef = useRef()
  const passRef = useRef()
  const { isLoading, error, isLoggedIn } = useSelector((state) => state.user)
  const [show, setShow] = useState(false)
  const from = location?.state?.from?.pathname || "/"

  const handleOnClick = async (e) => {
    e.preventDefault()
    const username = uRef.current?.value
    const password = passRef.current?.value

    dispatch(userLogin({ username, password })) && navigate("/")
  }

  useEffect(() => {
    isLoggedIn && navigate(from)
  }, [isLoggedIn, navigate, from])

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
              // disabled={isLoading}
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
