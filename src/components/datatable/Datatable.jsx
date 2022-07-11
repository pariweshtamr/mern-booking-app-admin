import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { userColumns, userRows } from "../../datatablesource"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import axios from "axios"

const Datatable = ({ columns }) => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const pathApi =
    process.env.NODE_ENV === "production"
      ? `/api/${path}`
      : `http://localhost:8000/api/${path}`

  const [list, setList] = useState()

  const { data, loading, error } = useFetch(pathApi)

  useEffect(() => {
    setList(data)
  }, [data])

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(pathApi + `/${id}`)
      setList(list.filter((item) => item._id === id))
    } catch (error) {}
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  )
}

export default Datatable
