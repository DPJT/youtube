import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import noteService from "../../services/users";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Menu from "../../components/menu/menu";
import SkeletonUserList from "./SkeletonUserList";
import { store } from "react-notifications-component";
import {
  errorNotification,
  successNotification,
} from "../../components/notifications/notifications";

import SelectBox from "../../components/SelectorCustom/SelectBox";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [field, setField] = useState("");

  function fetchClients() {
    noteService
      .getAll()
      .then((initialNotes) => {
        setData(initialNotes);
        setLoading(false);
      })
      .catch((error) => {
        errorNotification({ message: "No se puedo Obtener los clientes" });
        setLoading(false);
      });
  }

  const handleInputChange = (event) => {
    console.log(event.target.value);
    // console.log(event.target);

    if (event.target.value === "") {
      fetchClients();
      setBusqueda(event.target.value);
    } else {
      setBusqueda(event.target.value);
      // empieza el fetch
      fetch(
        `http://localhost:3003/clients/search?search=${busqueda}&field=${field}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          setData(data);
          // fetchClientUser();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // termina el fetch
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    fetchClients();
    // setLoading(false);
    // }, 5000);
  }, []);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    console.log("estamos en el handlesubmit");
    // axios({bounceOut
    //   method: "post",
    //   url: "http://localhost:3003/api/createTrigger",
    //   data: usuario,
    // });

    // http://localhost:3003/clients/search?search=Diego&field=Nombre

    fetch(
      `http://localhost:3003/clients/search?search=${busqueda}&field=${field}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setData(data);
        // fetchClientUser();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    fetch(`http://localhost:3003/clients/${id}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Eliminado correctamente",
          width: 300,
          position: "top-right",
        });
        fetchClients();
      })
      .catch((error) => {
        errorNotification({
          message: "No se pudo eliminar el usuario",
          width: 300,
        });
      });
  };

  const itemsTest = [
    { name: "Todos los usuarios", link: "/users" },
    { name: "+ Crear Usuario", link: "/user/NewUser" },
  ];

  return (
    // <div className="userList"></div>
    // <div style={{ height: "50%", width: "100%" }} className="userList">
    <>
      <Menu menuItems={itemsTest} />
      <div className="SearchContainer">
        <SelectBox
          items={[
            { value: "Selecciona", value: "Selecciona", id: 1 },
            { value: "Nombre", value: "Nombre", id: 2 },
            { value: "Apellido", value: "Apellido", id: 3 },
            { value: "Ciudad", value: "Ciudad", id: 4 },
            { value: "Dirección", value: "Dirección", id: 5 },
          ]}
          funcion={setField}
        />

        <form action="" className="SearchForm" onSubmit={handleSubmitSearch}>
          <input
            type="text"
            className="SearchInput"
            placeholder="Search..."
            onChange={handleInputChange}
          />
          <button className="SearchButton">
            <h3>Search</h3>
          </button>
        </form>

        {/* <p className="SelectBox-h3">Busqueda Por:</p> */}
      </div>

      {loading ? (
        <SkeletonUserList />
      ) : (
        <div className="userList">
          {/* <div className="container-usuario">
            <ThemeProvider theme={theme}>
              <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={50}
                checkboxSelection
              />
            </ThemeProvider>
          </div> */}
          <div className="userListTable">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>userName</th>
                  <th>Phone</th>
                  <th>Ciudad</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((client) => (
                  <tr key={client._id}>
                    <td>
                      <div className="userListUser">
                        <img
                          className="userListImg"
                          alt=""
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUzIDUzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz4KPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iIiBkPSJNMTguNjEzLDQxLjU1MmwtNy45MDcsNC4zMTNjLTAuNDY0LDAuMjUzLTAuODgxLDAuNTY0LTEuMjY5LDAuOTAzQzE0LjA0Nyw1MC42NTUsMTkuOTk4LDUzLDI2LjUsNTMgIGM2LjQ1NCwwLDEyLjM2Ny0yLjMxLDE2Ljk2NC02LjE0NGMtMC40MjQtMC4zNTgtMC44ODQtMC42OC0xLjM5NC0wLjkzNGwtOC40NjctNC4yMzNjLTEuMDk0LTAuNTQ3LTEuNzg1LTEuNjY1LTEuNzg1LTIuODg4di0zLjMyMiAgYzAuMjM4LTAuMjcxLDAuNTEtMC42MTksMC44MDEtMS4wM2MxLjE1NC0xLjYzLDIuMDI3LTMuNDIzLDIuNjMyLTUuMzA0YzEuMDg2LTAuMzM1LDEuODg2LTEuMzM4LDEuODg2LTIuNTN2LTMuNTQ2ICBjMC0wLjc4LTAuMzQ3LTEuNDc3LTAuODg2LTEuOTY1di01LjEyNmMwLDAsMS4wNTMtNy45NzctOS43NS03Ljk3N3MtOS43NSw3Ljk3Ny05Ljc1LDcuOTc3djUuMTI2ICBjLTAuNTQsMC40ODgtMC44ODYsMS4xODUtMC44ODYsMS45NjV2My41NDZjMCwwLjkzNCwwLjQ5MSwxLjc1NiwxLjIyNiwyLjIzMWMwLjg4NiwzLjg1NywzLjIwNiw2LjYzMywzLjIwNiw2LjYzM3YzLjI0ICBDMjAuMjk2LDM5Ljg5OSwxOS42NSw0MC45ODYsMTguNjEzLDQxLjU1MnoiIGZpbGw9IiNlN2VjZWQiIGRhdGEtb3JpZ2luYWw9IiNlN2VjZWQiPjwvcGF0aD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIHN0eWxlPSIiIGQ9Ik0yNi45NTMsMC4wMDRDMTIuMzItMC4yNDYsMC4yNTQsMTEuNDE0LDAuMDA0LDI2LjA0N0MtMC4xMzgsMzQuMzQ0LDMuNTYsNDEuODAxLDkuNDQ4LDQ2Ljc2ICAgYzAuMzg1LTAuMzM2LDAuNzk4LTAuNjQ0LDEuMjU3LTAuODk0bDcuOTA3LTQuMzEzYzEuMDM3LTAuNTY2LDEuNjgzLTEuNjUzLDEuNjgzLTIuODM1di0zLjI0YzAsMC0yLjMyMS0yLjc3Ni0zLjIwNi02LjYzMyAgIGMtMC43MzQtMC40NzUtMS4yMjYtMS4yOTYtMS4yMjYtMi4yMzF2LTMuNTQ2YzAtMC43OCwwLjM0Ny0xLjQ3NywwLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLTEuMDUzLTcuOTc3LDkuNzUtNy45NzcgICBzOS43NSw3Ljk3Nyw5Ljc1LDcuOTc3djUuMTI2YzAuNTQsMC40ODgsMC44ODYsMS4xODUsMC44ODYsMS45NjV2My41NDZjMCwxLjE5Mi0wLjgsMi4xOTUtMS44ODYsMi41MyAgIGMtMC42MDUsMS44ODEtMS40NzgsMy42NzQtMi42MzIsNS4zMDRjLTAuMjkxLDAuNDExLTAuNTYzLDAuNzU5LTAuODAxLDEuMDNWMzguOGMwLDEuMjIzLDAuNjkxLDIuMzQyLDEuNzg1LDIuODg4bDguNDY3LDQuMjMzICAgYzAuNTA4LDAuMjU0LDAuOTY3LDAuNTc1LDEuMzksMC45MzJjNS43MS00Ljc2Miw5LjM5OS0xMS44ODIsOS41MzYtMTkuOUM1My4yNDYsMTIuMzIsNDEuNTg3LDAuMjU0LDI2Ljk1MywwLjAwNHoiIGZpbGw9IiM1NTYwODAiIGRhdGEtb3JpZ2luYWw9IiM1NTYwODAiPjwvcGF0aD4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                        />
                        {`${client.name.first} ${client.name.last}`}
                      </div>
                    </td>
                    <td>{client.userName}</td>
                    <td>{client.contact.phone}</td>
                    <td>{client.contact.city}</td>
                    <td>
                      <>
                        <Link to={"/user/" + client._id}>
                          <button
                            className="userListVer"
                            // onClick={() => User.getUserId(params.row.id)}
                          >
                            <VisibilityIcon
                              className="iconVisibility"
                              // onClick={() => handleDelete(params.row.id)}
                            />
                          </button>
                        </Link>
                        <DeleteOutline
                          className="userListDelete"
                          onClick={() => handleDelete(client._id)}
                        />
                      </>
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <td>ffffff</td>
                  <td>vvvvvvvv</td>
                </tr> */}
              </tbody>
            </table>
            {/* <div>dddddddddd</div>
            <button>Add Row</button> */}
          </div>
        </div>
      )}
    </>
  );
}
