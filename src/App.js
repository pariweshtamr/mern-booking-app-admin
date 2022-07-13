import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Single from "./pages/single/Single"
import New from "./pages/new/New"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { productInputs, userInputs } from "./formSource"
import "./style/dark.scss"
import { useDispatch, useSelector } from "react-redux"
import { hotelColumns, userColumns } from "./datatablesource"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import { useEffect } from "react"
import { autoLogin } from "./redux/User/UserAction"

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user)
  const { darkMode } = useSelector((state) => state.darkMode)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(user, isLoggedIn)
    user && dispatch(autoLogin())
  }, [user, isLoggedIn, dispatch])

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route exact path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />{" "}
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={productInputs} title="Add New Hotel" />{" "}
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
