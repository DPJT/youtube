import { Publish } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./user.css";
import "./notify.css";
import noteService from "../../services/users";
import { useParams } from "react-router-dom";
import NoteForm from "../../components/NoteForm/NoteForm";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { utcToLocal } from "../../services/utcToLocal";

export function CreateClientForm({ userId }) {
  const [usuario, setUsuario] = useState({
    type: "",
    name: {
      first: "",
      last: "",
    },
    facebookId: "",
    description: "",
    contact: {
      phone: "",
      city: "Ecuador",
    },
  });

  const [updateUser, setUpdateUser] = useState({});

  function fetchClientUser() {
    noteService.getOne(userId).then((user) => {
      console.log("este es el usuario recibido", user);
      setUsuario(user.clientUser);
    });
  }

  const handleInputChange = (event) => {
    console.log(event.target.value);
    console.log(event.target);
    if (event.target.name === "first" || event.target.name === "last") {
      const name = {
        ...updateUser.name,
        ...{ [event.target.name]: event.target.value },
      };
      setUpdateUser({
        ...updateUser,
        ...{ name: name },
      });
      console.log("update user desde primer if ", updateUser);
    } else if (
      event.target.name === "email" ||
      event.target.name === "phone" ||
      event.target.name === "homeAdress"
    ) {
      const contact = {
        ...updateUser.contact,
        ...{ [event.target.name]: event.target.value },
      };
      setUpdateUser({
        ...updateUser,
        ...{ contact: contact },
      });
    } else {
      setUpdateUser({
        ...updateUser,
        [event.target.name]: event.target.value,
      });

      console.log("user desde el else", updateUser);
    }
  };
  const enviarDatos = (event) => {
    event.preventDefault();

    // axios({bounceOut
    //   method: "post",
    //   url: "http://localhost:3003/api/createTrigger",
    //   data: usuario,
    // });

    fetch(`http://localhost:3003/clients/${usuario._id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        store.addNotification({
          // width: 450,
          // id: "1",
          content: MyNotify,
          container: "bottom-right",
          insert: "top",
          animationIn: ["animate__animated animate__bounceIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__bounceOut"], // `animate.css v4` classes
          dismiss: {
            duration: 3000,
            waitForAnimation: true,
            showIcon: true,
            // click: false,
          },
        });
        fetchClientUser();
      })
      .catch((error) => {
        console.error("Error:", error);
        store.addNotification({
          width: 350,
          // id: "1",
          content: MyErrorNotify,
          container: "bottom-right",
          insert: "top",
          animationIn: ["animate__animated animate__bounceIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__bounceOut"], // `animate.css v4` classes
          dismiss: {
            duration: 3000,
            waitForAnimation: true,
            showIcon: true,
            // click: false,
          },
        });
      });
  };
  return (
    <>
      {/* inicio de seccion de update user */}
      <div className="userUpdate">
        <span className="userUpdateTitle">Edit</span>
        <form className="userUpdateForm" onSubmit={enviarDatos}>
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                placeholder="annabeck99"
                className="userUpdateInput"
                name="userName"
                onChange={handleInputChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>First</label>
              <input
                type="text"
                placeholder="Anna Becker"
                name="first"
                className="userUpdateInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Last</label>
              <input
                type="text"
                placeholder="Anna Becker"
                name="last"
                className="userUpdateInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="annabeck99@gmail.com"
                className="userUpdateInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Phone</label>
              <input
                type="text"
                placeholder="+1 123 456 67"
                className="userUpdateInput"
                name="phone"
                onChange={handleInputChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Address</label>
              <input
                type="text"
                placeholder="New York | USA"
                className="userUpdateInput"
                name="homeAdress"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="userUpdateRight">
            <div className="userUpdateUpload">
              <img
                className="userUpdateImg"
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUzIDUzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz4KPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iIiBkPSJNMTguNjEzLDQxLjU1MmwtNy45MDcsNC4zMTNjLTAuNDY0LDAuMjUzLTAuODgxLDAuNTY0LTEuMjY5LDAuOTAzQzE0LjA0Nyw1MC42NTUsMTkuOTk4LDUzLDI2LjUsNTMgIGM2LjQ1NCwwLDEyLjM2Ny0yLjMxLDE2Ljk2NC02LjE0NGMtMC40MjQtMC4zNTgtMC44ODQtMC42OC0xLjM5NC0wLjkzNGwtOC40NjctNC4yMzNjLTEuMDk0LTAuNTQ3LTEuNzg1LTEuNjY1LTEuNzg1LTIuODg4di0zLjMyMiAgYzAuMjM4LTAuMjcxLDAuNTEtMC42MTksMC44MDEtMS4wM2MxLjE1NC0xLjYzLDIuMDI3LTMuNDIzLDIuNjMyLTUuMzA0YzEuMDg2LTAuMzM1LDEuODg2LTEuMzM4LDEuODg2LTIuNTN2LTMuNTQ2ICBjMC0wLjc4LTAuMzQ3LTEuNDc3LTAuODg2LTEuOTY1di01LjEyNmMwLDAsMS4wNTMtNy45NzctOS43NS03Ljk3N3MtOS43NSw3Ljk3Ny05Ljc1LDcuOTc3djUuMTI2ICBjLTAuNTQsMC40ODgtMC44ODYsMS4xODUtMC44ODYsMS45NjV2My41NDZjMCwwLjkzNCwwLjQ5MSwxLjc1NiwxLjIyNiwyLjIzMWMwLjg4NiwzLjg1NywzLjIwNiw2LjYzMywzLjIwNiw2LjYzM3YzLjI0ICBDMjAuMjk2LDM5Ljg5OSwxOS42NSw0MC45ODYsMTguNjEzLDQxLjU1MnoiIGZpbGw9IiNlN2VjZWQiIGRhdGEtb3JpZ2luYWw9IiNlN2VjZWQiPjwvcGF0aD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIHN0eWxlPSIiIGQ9Ik0yNi45NTMsMC4wMDRDMTIuMzItMC4yNDYsMC4yNTQsMTEuNDE0LDAuMDA0LDI2LjA0N0MtMC4xMzgsMzQuMzQ0LDMuNTYsNDEuODAxLDkuNDQ4LDQ2Ljc2ICAgYzAuMzg1LTAuMzM2LDAuNzk4LTAuNjQ0LDEuMjU3LTAuODk0bDcuOTA3LTQuMzEzYzEuMDM3LTAuNTY2LDEuNjgzLTEuNjUzLDEuNjgzLTIuODM1di0zLjI0YzAsMC0yLjMyMS0yLjc3Ni0zLjIwNi02LjYzMyAgIGMtMC43MzQtMC40NzUtMS4yMjYtMS4yOTYtMS4yMjYtMi4yMzF2LTMuNTQ2YzAtMC43OCwwLjM0Ny0xLjQ3NywwLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLTEuMDUzLTcuOTc3LDkuNzUtNy45NzcgICBzOS43NSw3Ljk3Nyw5Ljc1LDcuOTc3djUuMTI2YzAuNTQsMC40ODgsMC44ODYsMS4xODUsMC44ODYsMS45NjV2My41NDZjMCwxLjE5Mi0wLjgsMi4xOTUtMS44ODYsMi41MyAgIGMtMC42MDUsMS44ODEtMS40NzgsMy42NzQtMi42MzIsNS4zMDRjLTAuMjkxLDAuNDExLTAuNTYzLDAuNzU5LTAuODAxLDEuMDNWMzguOGMwLDEuMjIzLDAuNjkxLDIuMzQyLDEuNzg1LDIuODg4bDguNDY3LDQuMjMzICAgYzAuNTA4LDAuMjU0LDAuOTY3LDAuNTc1LDEuMzksMC45MzJjNS43MS00Ljc2Miw5LjM5OS0xMS44ODIsOS41MzYtMTkuOUM1My4yNDYsMTIuMzIsNDEuNTg3LDAuMjU0LDI2Ljk1MywwLjAwNHoiIGZpbGw9IiM1NTYwODAiIGRhdGEtb3JpZ2luYWw9IiM1NTYwODAiPjwvcGF0aD4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
              />
              {/* <img
                  className="userUpdateImg"
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxsaW5lYXJHcmFkaWVudCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI1MTIiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1NTU4ZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMGMwZmYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI0NTIiIHkyPSI5MSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYWRkY2ZmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNTAyOCIgc3RvcC1jb2xvcj0iI2VhZjZmZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2VhZjZmZiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48Zz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIGZpbGw9InVybCgjU1ZHSURfMV8pIiByPSIyNTYiIGRhdGEtb3JpZ2luYWw9InVybCgjU1ZHSURfMV8pIiBzdHlsZT0iIj48L2NpcmNsZT48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zMzEgMTY2YzAtNDEuMzU1LTMzLjY0NS03NS03NS03NXMtNzUgMzMuNjQ1LTc1IDc1IDMzLjY0NSA3NSA3NSA3NSA3NS0zMy42NDUgNzUtNzV6bS03NSA3NWMtNzQuNDM5IDAtMTM1IDYwLjU2MS0xMzUgMTM1djE0LjA1OGMwIDQuMjY0IDEuODE0IDguMzI2IDQuOTkgMTEuMTcxIDM2LjUzOCAzMi43NCA4Mi43MSA1MC43NzEgMTMwLjAxIDUwLjc3MSA0Ny4zMDEgMCA5My40NzMtMTguMDMxIDEzMC4wMS01MC43NzEgMy4xNzYtMi44NDUgNC45OS02LjkwOCA0Ljk5LTExLjE3MXYtMTQuMDU4YzAtNzQuNDM5LTYwLjU2MS0xMzUtMTM1LTEzNXoiIGZpbGw9InVybCgjU1ZHSURfMl8pIiBkYXRhLW9yaWdpbmFsPSJ1cmwoI1NWR0lEXzJfKSIgc3R5bGU9IiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
                /> */}

              <label htmlFor="file">
                <Publish className="userUpdateIcon" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="userUpdateButton">Update</button>
          </div>
        </form>
      </div>
      {/* fin seccion user */}
    </>
  );
}

function MyNotify() {
  return (
    <>
      <div className="notifyContainer">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGNpcmNsZSBzdHlsZT0iIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyMzYuMTciIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMxMTM4ZjciIGNsYXNzPSIiPjwvY2lyY2xlPgoJPHBhdGggc3R5bGU9IiIgZD0iTTI1Niw1MTJDMTE0Ljg1Myw1MTIsMCwzOTcuMTY3LDAsMjU2QzAsMTE0Ljg1MywxMTQuODUzLDAsMjU2LDBjMTQxLjE2NywwLDI1NiwxMTQuODUzLDI1NiwyNTYgICBDNTEyLDM5Ny4xNjcsMzk3LjE2Nyw1MTIsMjU2LDUxMnogTTI1NiwzOS42NTlDMTM2LjcwNSwzOS42NTksMzkuNjU5LDEzNi43MDUsMzkuNjU5LDI1NlMxMzYuNzA1LDQ3Mi4zNDEsMjU2LDQ3Mi4zNDEgICBTNDcyLjM0MSwzNzUuMjc1LDQ3Mi4zNDEsMjU2QzQ3Mi4zNDEsMTM2LjcwNSwzNzUuMjk1LDM5LjY1OSwyNTYsMzkuNjU5eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzExMzhmNyIgY2xhc3M9IiI+PC9wYXRoPgo8L2c+CjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3R5bGU9IiIgZD0iTTIyNS4wNjYsMzUwLjE5MWMtNS4zMTQsMC0xMC4zOTEtMi4xMjItMTQuMTM5LTUuOTI5bC03My4xNzEtNzQuMzYxICBjLTcuNjc0LTcuODEzLTcuNTc1LTIwLjM0NSwwLjIzOC0yOC4wMzljNy44MTMtNy42NTQsMjAuMzY1LTcuNTc1LDI4LjAzOSwwLjIzOGw1OC40NTgsNTkuNDA5bDEyMC45NDEtMTMzLjE5NSAgYzcuMzk2LTguMTEsMTkuOTI5LTguNjg1LDI3Ljk5OS0xLjM0OGM4LjExLDcuMzU3LDguNzA1LDE5Ljg4OSwxLjM0OCwyOC4wMTlMMjM5Ljc0LDM0My43MDZjLTMuNjY4LDQuMDQ1LTguODI0LDYuMzg1LTE0LjI3Nyw2LjUwNCAgQzIyNS4zMjQsMzUwLjE5MSwyMjUuMjA1LDM1MC4xOTEsMjI1LjA2NiwzNTAuMTkxeiIgZmlsbD0iIzI1YTUzMyIgZGF0YS1vcmlnaW5hbD0iI2ZmZmZmZiIgY2xhc3M9IiI+PC9wYXRoPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+" />
        <h1 className="h1Not">Successfully</h1>
        <h4 className="h4Not">Completado con exito</h4>
      </div>
    </>
  );
}

function MyErrorNotify() {
  return (
    <>
      <div className="notifyErrorContainer">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMS45OSA1MTEuOTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGVsbGlwc2Ugc3R5bGU9IiIgY3g9IjI1NS45OTIiIGN5PSIyNTUuOTk5IiByeD0iMjM2LjI3OCIgcnk9IjIzNi4yNzgiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMxMTM4ZjciPjwvZWxsaXBzZT4KCTxwYXRoIHN0eWxlPSIiIGQ9Ik0yNTUuOTk1LDUxMS45NzljLTY1LjU4NywwLTEzMS4xNzQtMjQuOTU3LTE4MS4xMDgtNzQuODcyYy05OS44NDktOTkuODQ5LTk5Ljg0OS0yNjIuMzQ4LDAtMzYyLjIxNyAgIGwwLDBjOTkuODQ5LTk5LjgyOSwyNjIuMzY4LTk5Ljg0OSwzNjIuMjE3LDBjOTkuODQ5LDk5Ljg2OSw5OS44NDksMjYyLjM0OCwwLDM2Mi4yMTcgICBDMzg3LjE2OSw0ODcuMDIyLDMyMS41NjIsNTExLjk3OSwyNTUuOTk1LDUxMS45Nzl6IE0xMDIuOTM5LDEwMi45NDJjLTg0LjM3NCw4NC4zOTQtODQuMzc0LDIyMS43MTksMCwzMDYuMTEzICAgYzg0LjQxNCw4NC4zNzQsMjIxLjczOCw4NC4zOTQsMzA2LjExMywwczg0LjM3NC0yMjEuNzE5LDAtMzA2LjExM0MzMjQuNjM3LDE4LjU2OCwxODcuMzMzLDE4LjU2OCwxMDIuOTM5LDEwMi45NDJMMTAyLjkzOSwxMDIuOTQyICAgeiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzExMzhmNyI+PC9wYXRoPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBzdHlsZT0iIiBkPSJNMTg3LjExNSwzNDQuNjc4Yy01LjA3OSwwLTEwLjE1Ny0xLjk0NC0xNC4wMjYtNS44MTNjLTcuNzU3LTcuNzU3LTcuNzU3LTIwLjI5NSwwLTI4LjA1MiAgIGwxNDAuMjYtMTQwLjI2YzcuNzU3LTcuNzU3LDIwLjI5NS03Ljc1NywyOC4wNTIsMGM3Ljc1Nyw3Ljc1Nyw3Ljc1NywyMC4yOTUsMCwyOC4wNTJsLTE0MC4yNiwxNDAuMjYgICBDMTk3LjI1MiwzNDIuNzM0LDE5Mi4xOTMsMzQ0LjY3OCwxODcuMTE1LDM0NC42Nzh6IiBmaWxsPSIjZmYwMDAwIiBkYXRhLW9yaWdpbmFsPSIjZmZmZmZmIiBjbGFzcz0iIj48L3BhdGg+Cgk8cGF0aCBzdHlsZT0iIiBkPSJNMzI3LjM1NSwzNDQuNjc4Yy01LjA3OSwwLTEwLjE1Ny0xLjk0NC0xNC4wMjYtNS44MTNsLTE0MC4yNi0xNDAuMjYgICBjLTcuNzU3LTcuNzU3LTcuNzU3LTIwLjI5NSwwLTI4LjA1MnMyMC4yOTUtNy43NTcsMjguMDUyLDBsMTQwLjI2LDE0MC4yNmM3Ljc1Nyw3Ljc1Nyw3Ljc1NywyMC4yOTUsMCwyOC4wNTIgICBDMzM3LjUxMywzNDIuNzM0LDMzMi40MzQsMzQ0LjY3OCwzMjcuMzU1LDM0NC42Nzh6IiBmaWxsPSIjZmYwMDAwIiBkYXRhLW9yaWdpbmFsPSIjZmZmZmZmIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" />
        <h1 className="h1Not">Error</h1>
        <h4 className="h4Not">No se pudo guardar en la base de datos</h4>
      </div>
    </>
  );
}
