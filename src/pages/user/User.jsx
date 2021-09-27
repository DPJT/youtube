import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  HomeOutlined,
  WcOutlined,
  PermContactCalendarOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./user.css";
import noteService from "../../services/users";
import { useParams } from "react-router-dom";
import NoteForm from "../../components/NoteForm/NoteForm";
import {
  errorNotification,
  successNotification,
} from "../../components/notifications/notifications";
import axios from "axios";
import { DeleteOutline, Edit } from "@material-ui/icons";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { utcToLocal, timeAgo } from "../../services/utcToLocal";
import { obtenerFechaActual } from "../../services/fechaUTCActual";
import { NewPedidoForm } from "../../components/pedidosForm/newPedido";
import { FormPedido } from "../../components/formPedido/formPedido";

let userId;
let objetoPedido;
let pedidoId;
let setearPedido;

function User(id) {
  const params = useParams();
  userId = params.userId;
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
  // setInterval(fetchClientUser(), 60000);
  useEffect(() => {
    fetchClientUser();
    // console.log(
    //   "Transformado a normal",
    //   utcToLocal(obtenerFechaActual()).replaceAll("/", "-")
    // );
  }, []);

  const [updateUser, setUpdateUser] = useState({});

  const [editPedidoState, setEditPedidoState] = useState(false);

  const [showPedidosState, setShowPedidos] = useState({
    loged: false,
  });
  const [addPedidoState, setAddPedido] = useState(false);
  const removePedidoOfClient = (pedidoId) => {
    // setData(data.filter((item) => item.id !== id));
    fetch(`http://localhost:3003/clients/removepedido/${userId}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pedidoId: pedidoId }),
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Removido correctamente del cliente",
          width: 300,
          position: "top-right",
        });
        fetchClientUser();
      })
      .catch((error) => {
        errorNotification({
          message: "Error al remover el pedido del cliente",
          width: 300,
        });
      });
  };
  const handleDelete = (event, pedidoId) => {
    event.preventDefault();
    // setData(data.filter((item) => item.id !== id));
    fetch(`http://localhost:3003/pedidos/${pedidoId}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Eliminado correctamente",
          width: 300,
          position: "top-right",
        });
        removePedidoOfClient(pedidoId);
        fetchClientUser();
      })
      .catch((error) => {
        errorNotification({
          message: "Error al eliminar el pedido",
          width: 300,
        });
      });
  };

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
      event.target.name === "homeAdress" ||
      event.target.name === "city" ||
      event.target.name === "age"
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

  function actualizarEstado(setPedido) {
    // setPedido({ detalles: "kdmlkdmlkrmdlrkdm dkmrkmdrkmfokmoo" });

    setearPedido = setPedido;
  }

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log("este es el update user ", updateUser);
    console.log(usuario);
    console.log(usuario.nombre + " " + usuario.apellido);

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
        successNotification({
          message: "Completado con exito",
          width: 400,
        });
        fetchClientUser();
      })
      .catch((error) => {
        errorNotification({
          message: "Error obteniendo clinte de la base de datos",
          width: 400,
        });
      });
  };

  const mostrarPedidos = (event) => {
    event.preventDefault();

    if (showPedidosState.loged) {
      setShowPedidos({
        loged: false,
      });
    } else {
      async function test() {
        try {
          setShowPedidos({
            loged: true,
          });
          return;
        } catch (error) {
          return console.log(error);
        }
      }
      test()
        .then(() => {
          if (usuario.pedidos === undefined || usuario.pedidos === null) {
            const input = document.getElementById("sinPedidos");
            // input.focus();
            window.scrollTo({
              top: input.offsetTop,
              behavior: "smooth",
            });
          } else {
            const input = document.getElementById("conPedidos");

            window.scrollTo({
              top: input.offsetTop,
              behavior: "smooth",
            });
          }
        })
        .then(() => {
          if (usuario.pedidos === undefined || usuario.pedidos === null) {
            setTimeout(() => {
              setShowPedidos({
                loged: false,
              });
            }, 1000);
          }
        });
    }
    console.log("unonuo", usuario);
    console.log("dosdso", usuario.nombre + " " + usuario.apellido);
  };

  const addPedido = (event) => {
    event.preventDefault();
    setEditPedidoState(false);

    if (addPedidoState) {
      setAddPedido(false);
    } else {
      async function test() {
        try {
          setAddPedido(true);
          return;
        } catch (error) {
          return console.log(error);
        }
      }
      test().then(() => {
        const input = document.getElementById("inputNewPedido");
        // input.focus();
        window.scrollTo({
          top: input.offsetTop,
          behavior: "smooth",
        });
      });
    }
  };

  const cerrarEditPedido = () => {
    editPedidoState ? setEditPedidoState(false) : setEditPedidoState(true);
  };
  const cerrarAddPedido = () => {
    setAddPedido(false);
  };

  function PedidosList() {
    const editPedido = (event, pedidoIdentificador) => {
      editPedidoState ? setEditPedidoState(false) : setEditPedidoState(true);

      setAddPedido(false);

      // setEditPedidoState(true);

      pedidoId = pedidoIdentificador;

      event.preventDefault();

      const getOne = (id) => {
        const request = axios.get("http://localhost:3003/pedidos" + "/" + id);
        return request.then((response) => {
          return response.data;
        });
      };

      getOne(pedidoIdentificador).then((data) => {
        // objetoPedido = data;
        setearPedido(data);
      });

      // if (addPedidoState) {
      //   setAddPedido(false);
      // } else {
      async function test() {
        try {
          setEditPedidoState(true);
          return;
        } catch (error) {
          return console.log(error);
        }
      }
      test().then(() => {
        const input = document.getElementById("inputNewPedido");
        // input.focus();
        window.scrollTo({
          top: input.offsetTop,
          behavior: "smooth",
        });
      });
      // }
    };

    return (
      <>
        <div className="BotonX">
          <button className="userOcultarButton" onClick={mostrarPedidos}>
            X
          </button>
        </div>
        <div>
          {/* <button className="userOcultarButton1" onClick={mostrarPedidos}>
            X
          </button> */}
          <button className="userOcultarButton" onClick={fetchClientUser}>
            Actualizar
          </button>
          <h1 className="pedidosTitle">Pedidos</h1>
        </div>
        <div className="pedidosContainer-flex" id="conPedidos">
          {usuario.pedidos.map((pedido) => (
            <div
              key={pedido._id}
              className={
                pedido.status === "solicitado"
                  ? "pedidosContainer-item solicitado"
                  : pedido.status === "confirmado"
                  ? "pedidosContainer-item confirmado"
                  : pedido.status === "completado"
                  ? "pedidosContainer-item completado"
                  : "pedidosContainer-item cancelado"
              }
            >
              <div className="pedidosContainer-fecha">
                <h2>{utcToLocal(pedido.createdAt)}</h2>
                <h2>{timeAgo(pedido.createdAt)}</h2>
              </div>
              {/* <button
                className="pedidosContainer-BtnEdit"
                onClick={(event) => editPedido(event, pedido._id)}
              >
                Edit
              </button> */}
              <DeleteOutline
                className="pedidosContainer-BtnDelete"
                onClick={(event) => handleDelete(event, pedido._id)}
              />
              <Edit
                className="pedidosContainer-BtnEdit"
                onClick={(event) => editPedido(event, pedido._id)}
              />
              <h1>
                {/* Status:{"    "} */}
                <div
                  className={
                    pedido.status === "solicitado"
                      ? "bolitaPedido solicitado"
                      : pedido.status === "confirmado"
                      ? "bolitaPedido confirmado"
                      : pedido.status === "completado"
                      ? "bolitaPedido completado"
                      : "bolitaPedido cancelado"
                  }
                ></div>
                {pedido.status[0].toUpperCase() + pedido.status.substring(1)}
              </h1>
              <h2>Detalles</h2>
              {/* inicio item pedido */}
              <p>{pedido.detalles}</p>
              {/* seccion pagos */}
              <h2>Pago</h2>
              <h3>Status:</h3>
              <div className="pedidosContainerParrafo">
                <p
                  className={
                    pedido.pago.status === "pendiente"
                      ? "pedido-pago-status-pendiente"
                      : pedido.pago.status === "completo"
                      ? "pedido-pago-status-completo"
                      : "pedido-pago-status"
                  }
                >
                  {pedido.pago.status}
                </p>
              </div>
              <h3>Abono:</h3>
              <div className="pedidosContainerParrafo">
                <p>$ {pedido.pago.abono}</p>
              </div>
              <h3>Actual:</h3>
              <div className="pedidosContainerParrafo">
                <p>$ {pedido.pago.actual}</p>
              </div>
              <h3>Total:</h3>
              <div className="pedidosContainerParrafo">
                <p>$ {pedido.pago.total}</p>
              </div>
              <h3>Descuento:</h3>
              <div className="pedidosContainerParrafo">
                <p>$ {pedido.pago.descuento}</p>
              </div>
              {/* fin seccion pagos */}
              {/* seccion entrega */}
              <h2>Entrega</h2>
              <h3>Tipo:</h3>
              <div className="pedidosContainerParrafo">
                <p>{pedido.entrega.tipo}</p>
              </div>
              <h3>Status:</h3>
              <div className="pedidosContainerParrafo">
                <p
                  className={
                    pedido.entrega.status === "pendiente"
                      ? "pedido-pago-status-pendiente"
                      : "pedido-pago-status-completo"
                  }
                >
                  {pedido.entrega.status}
                </p>
              </div>{" "}
              <br />
              <h3>Fecha:</h3>
              <div className="pedidosContainerParrafo">
                <p>{pedido.entrega.fecha}</p>
              </div>{" "}
              <br />
              <h3>Ciudad:</h3>
              <div className="pedidosContainerParrafo">
                <p>{pedido.entrega.ciudad}</p>
              </div>{" "}
              <br />
              <h3>Dirección:</h3>
              <div className="pedidosContainerParrafo">
                <p>{pedido.entrega.direccion}</p>
              </div>
              {/* fin seccion entreg */}
            </div>
          ))}

          {/* fin de un item pedido */}
        </div>
      </>
    );
  }

  function fetchClientUser() {
    noteService.getOne(userId).then((user) => {
      console.log("este es el usuario recibido", user);
      setUsuario(user);
    });
  }

  // const addNote = (noteObject) => {
  //   noteService.create(noteObject).then((returnedNote) => {
  //     setData(data.concat(returnedNote));
  //   });
  // };

  // useEffect(() => {
  //   noteService.getAll().then((initialNotes) => {
  //     setData(initialNotes);
  //   });
  // }, []);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  return (
    <div className="user">
      {/* <NoteForm addNote={addNote} /> */}
      <div className="userTitleContainer">
        <h1 className="userTitle">Datos del Cliente</h1>

        <div className="menuContainer">
          <Link to="/newUser">
            <button className="dropbtn">Create</button>
          </Link>
          {/* inicio dropdown opciones */}
          <div className="dropdown">
            <button className="dropbtn">+</button>
            <div className="dropdown-content">
              <a href="#">Añadir Pedido</a>
              <a href="#">Ver Compras</a>
              <a href="#">Añadir Categoria</a>
              <a href="#">Enviar Whatsapp</a>
            </div>
          </div>
          {/* fin dropdown opciones */}

          {/* inicio dropdown opciones */}
          <div className="dropdown">
            <button className="dropbtn">Opciones</button>
            <div className="dropdown-content">
              <button className="boton" onClick={addPedido}>
                Crear Pedido
              </button>
              <a onClick={addPedido}>Crear Pedido</a>
              <a href="#">Ver Compras</a>
              <a href="#">Enviar Whatsapp xxxxxxxxxx</a>
            </div>
          </div>
          {/* fin dropdown opciones */}
        </div>
      </div>
      <div className="userContainer">
        {/* inicio seccion data user */}
        <div className="userShow">
          {/* inicio titulo y foto */}
          <div className="userShowTop">
            <img
              className="userShowImg"
              alt=""
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUzIDUzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz4KPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iIiBkPSJNMTguNjEzLDQxLjU1MmwtNy45MDcsNC4zMTNjLTAuNDY0LDAuMjUzLTAuODgxLDAuNTY0LTEuMjY5LDAuOTAzQzE0LjA0Nyw1MC42NTUsMTkuOTk4LDUzLDI2LjUsNTMgIGM2LjQ1NCwwLDEyLjM2Ny0yLjMxLDE2Ljk2NC02LjE0NGMtMC40MjQtMC4zNTgtMC44ODQtMC42OC0xLjM5NC0wLjkzNGwtOC40NjctNC4yMzNjLTEuMDk0LTAuNTQ3LTEuNzg1LTEuNjY1LTEuNzg1LTIuODg4di0zLjMyMiAgYzAuMjM4LTAuMjcxLDAuNTEtMC42MTksMC44MDEtMS4wM2MxLjE1NC0xLjYzLDIuMDI3LTMuNDIzLDIuNjMyLTUuMzA0YzEuMDg2LTAuMzM1LDEuODg2LTEuMzM4LDEuODg2LTIuNTN2LTMuNTQ2ICBjMC0wLjc4LTAuMzQ3LTEuNDc3LTAuODg2LTEuOTY1di01LjEyNmMwLDAsMS4wNTMtNy45NzctOS43NS03Ljk3N3MtOS43NSw3Ljk3Ny05Ljc1LDcuOTc3djUuMTI2ICBjLTAuNTQsMC40ODgtMC44ODYsMS4xODUtMC44ODYsMS45NjV2My41NDZjMCwwLjkzNCwwLjQ5MSwxLjc1NiwxLjIyNiwyLjIzMWMwLjg4NiwzLjg1NywzLjIwNiw2LjYzMywzLjIwNiw2LjYzM3YzLjI0ICBDMjAuMjk2LDM5Ljg5OSwxOS42NSw0MC45ODYsMTguNjEzLDQxLjU1MnoiIGZpbGw9IiNlN2VjZWQiIGRhdGEtb3JpZ2luYWw9IiNlN2VjZWQiPjwvcGF0aD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIHN0eWxlPSIiIGQ9Ik0yNi45NTMsMC4wMDRDMTIuMzItMC4yNDYsMC4yNTQsMTEuNDE0LDAuMDA0LDI2LjA0N0MtMC4xMzgsMzQuMzQ0LDMuNTYsNDEuODAxLDkuNDQ4LDQ2Ljc2ICAgYzAuMzg1LTAuMzM2LDAuNzk4LTAuNjQ0LDEuMjU3LTAuODk0bDcuOTA3LTQuMzEzYzEuMDM3LTAuNTY2LDEuNjgzLTEuNjUzLDEuNjgzLTIuODM1di0zLjI0YzAsMC0yLjMyMS0yLjc3Ni0zLjIwNi02LjYzMyAgIGMtMC43MzQtMC40NzUtMS4yMjYtMS4yOTYtMS4yMjYtMi4yMzF2LTMuNTQ2YzAtMC43OCwwLjM0Ny0xLjQ3NywwLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLTEuMDUzLTcuOTc3LDkuNzUtNy45NzcgICBzOS43NSw3Ljk3Nyw5Ljc1LDcuOTc3djUuMTI2YzAuNTQsMC40ODgsMC44ODYsMS4xODUsMC44ODYsMS45NjV2My41NDZjMCwxLjE5Mi0wLjgsMi4xOTUtMS44ODYsMi41MyAgIGMtMC42MDUsMS44ODEtMS40NzgsMy42NzQtMi42MzIsNS4zMDRjLTAuMjkxLDAuNDExLTAuNTYzLDAuNzU5LTAuODAxLDEuMDNWMzguOGMwLDEuMjIzLDAuNjkxLDIuMzQyLDEuNzg1LDIuODg4bDguNDY3LDQuMjMzICAgYzAuNTA4LDAuMjU0LDAuOTY3LDAuNTc1LDEuMzksMC45MzJjNS43MS00Ljc2Miw5LjM5OS0xMS44ODIsOS41MzYtMTkuOUM1My4yNDYsMTIuMzIsNDEuNTg3LDAuMjU0LDI2Ljk1MywwLjAwNHoiIGZpbGw9IiM1NTYwODAiIGRhdGEtb3JpZ2luYWw9IiM1NTYwODAiPjwvcGF0aD4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
            />
            <div className="userShowTopTitle">
              <h3 className="userShowUsername">{`${usuario.name.first} ${usuario.name.last}`}</h3>
              <h3 className="userShowUserTitle">Cliente</h3>
            </div>
          </div>

          <div className="userShowBotopnesOpciones">
            <button className="pedidosBoton-editar" onClick={mostrarPedidos}>
              Editar
            </button>
            <button className="pedidosBoton-editar" onClick={mostrarPedidos}>
              Mostrar Pedidos
            </button>
            <button className="pedidosBoton-editar" onClick={addPedido}>
              Crear Pedido
            </button>
            <button className="pedidosBoton-editar" onClick={addPedido}>
              Ver Compras
            </button>
            <button className="pedidosBoton-editar" onClick={addPedido}>
              Acciones
            </button>
            <button className="pedidosBoton-editar" onClick={mostrarPedidos}>
              Enviar Whatsapp
            </button>
          </div>

          {/* categories */}
          <div className="userShowBotopnesOpciones">
            <span className="userShowTitle">Preferencias:</span>
            <button
              className="pedidosBoton-Categories"
              onClick={mostrarPedidos}
            >
              Sport
            </button>
            <button
              className="pedidosBoton-Categories"
              onClick={mostrarPedidos}
            >
              Casual
            </button>
            <button
              className="pedidosBoton-Categories"
              onClick={mostrarPedidos}
            >
              + categorie
            </button>
          </div>
          {/* account registro */}
          <div className="userShowBottom">
            <div className="userAccountDetails">
              <h3 className="userShowTitle">Registro</h3>

              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <h3 className="userShowIcon">Creado:</h3>
                  {utcToLocal(usuario.createdAt)}
                </span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <h3 className="userShowIcon">Modificado:</h3>
                  {utcToLocal(usuario.updatedAt)}
                </span>
              </div>
            </div>

            {/* separacion inicio dettales de contacto */}
            <div className="userContactDetails">
              <span className="userShowTitle">Detalles de Contacto</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />

                <span className="userShowInfoTitle">
                  {usuario.contact.phone}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {usuario.contact.email}
                </span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {usuario.contact.city ? usuario.contact.city : "Unknow"}
                </span>
              </div>
              <div className="userShowInfo">
                <HomeOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {usuario.contact.homeAdress
                    ? usuario.contact.homeAdress
                    : "Unknow"}
                </span>
              </div>
            </div>
            {/* inicio personals */}
            <div className="userAccountDetails">
              <h3 className="userShowTitle">Personal</h3>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{`${usuario.name.first} ${usuario.name.last}`}</span>
              </div>

              <div className="userShowInfo">
                <WcOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {usuario.contact.gender}
                </span>
              </div>

              <div className="userShowInfo">
                <PermContactCalendarOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">{usuario.contact.age}</span>
              </div>
            </div>
          </div>
        </div>
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
                <label>Age</label>
                <input
                  type="text"
                  placeholder="21"
                  className="userUpdateInput"
                  name="age"
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Ambato"
                  className="userUpdateInput"
                  name="city"
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
              <button className="userUpdateButton">Update</button>
            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUzIDUzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz4KPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iIiBkPSJNMTguNjEzLDQxLjU1MmwtNy45MDcsNC4zMTNjLTAuNDY0LDAuMjUzLTAuODgxLDAuNTY0LTEuMjY5LDAuOTAzQzE0LjA0Nyw1MC42NTUsMTkuOTk4LDUzLDI2LjUsNTMgIGM2LjQ1NCwwLDEyLjM2Ny0yLjMxLDE2Ljk2NC02LjE0NGMtMC40MjQtMC4zNTgtMC44ODQtMC42OC0xLjM5NC0wLjkzNGwtOC40NjctNC4yMzNjLTEuMDk0LTAuNTQ3LTEuNzg1LTEuNjY1LTEuNzg1LTIuODg4di0zLjMyMiAgYzAuMjM4LTAuMjcxLDAuNTEtMC42MTksMC44MDEtMS4wM2MxLjE1NC0xLjYzLDIuMDI3LTMuNDIzLDIuNjMyLTUuMzA0YzEuMDg2LTAuMzM1LDEuODg2LTEuMzM4LDEuODg2LTIuNTN2LTMuNTQ2ICBjMC0wLjc4LTAuMzQ3LTEuNDc3LTAuODg2LTEuOTY1di01LjEyNmMwLDAsMS4wNTMtNy45NzctOS43NS03Ljk3N3MtOS43NSw3Ljk3Ny05Ljc1LDcuOTc3djUuMTI2ICBjLTAuNTQsMC40ODgtMC44ODYsMS4xODUtMC44ODYsMS45NjV2My41NDZjMCwwLjkzNCwwLjQ5MSwxLjc1NiwxLjIyNiwyLjIzMWMwLjg4NiwzLjg1NywzLjIwNiw2LjYzMywzLjIwNiw2LjYzM3YzLjI0ICBDMjAuMjk2LDM5Ljg5OSwxOS42NSw0MC45ODYsMTguNjEzLDQxLjU1MnoiIGZpbGw9IiNlN2VjZWQiIGRhdGEtb3JpZ2luYWw9IiNlN2VjZWQiPjwvcGF0aD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIHN0eWxlPSIiIGQ9Ik0yNi45NTMsMC4wMDRDMTIuMzItMC4yNDYsMC4yNTQsMTEuNDE0LDAuMDA0LDI2LjA0N0MtMC4xMzgsMzQuMzQ0LDMuNTYsNDEuODAxLDkuNDQ4LDQ2Ljc2ICAgYzAuMzg1LTAuMzM2LDAuNzk4LTAuNjQ0LDEuMjU3LTAuODk0bDcuOTA3LTQuMzEzYzEuMDM3LTAuNTY2LDEuNjgzLTEuNjUzLDEuNjgzLTIuODM1di0zLjI0YzAsMC0yLjMyMS0yLjc3Ni0zLjIwNi02LjYzMyAgIGMtMC43MzQtMC40NzUtMS4yMjYtMS4yOTYtMS4yMjYtMi4yMzF2LTMuNTQ2YzAtMC43OCwwLjM0Ny0xLjQ3NywwLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLTEuMDUzLTcuOTc3LDkuNzUtNy45NzcgICBzOS43NSw3Ljk3Nyw5Ljc1LDcuOTc3djUuMTI2YzAuNTQsMC40ODgsMC44ODYsMS4xODUsMC44ODYsMS45NjV2My41NDZjMCwxLjE5Mi0wLjgsMi4xOTUtMS44ODYsMi41MyAgIGMtMC42MDUsMS44ODEtMS40NzgsMy42NzQtMi42MzIsNS4zMDRjLTAuMjkxLDAuNDExLTAuNTYzLDAuNzU5LTAuODAxLDEuMDNWMzguOGMwLDEuMjIzLDAuNjkxLDIuMzQyLDEuNzg1LDIuODg4bDguNDY3LDQuMjMzICAgYzAuNTA4LDAuMjU0LDAuOTY3LDAuNTc1LDEuMzksMC45MzJjNS43MS00Ljc2Miw5LjM5OS0xMS44ODIsOS41MzYtMTkuOUM1My4yNDYsMTIuMzIsNDEuNTg3LDAuMjU0LDI2Ljk1MywwLjAwNHoiIGZpbGw9IiM1NTYwODAiIGRhdGEtb3JpZ2luYWw9IiM1NTYwODAiPjwvcGF0aD4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                />
                <img
                  className="userUpdateImg"
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxsaW5lYXJHcmFkaWVudCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI1MTIiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1NTU4ZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMGMwZmYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI0NTIiIHkyPSI5MSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYWRkY2ZmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNTAyOCIgc3RvcC1jb2xvcj0iI2VhZjZmZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2VhZjZmZiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48Zz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIGZpbGw9InVybCgjU1ZHSURfMV8pIiByPSIyNTYiIGRhdGEtb3JpZ2luYWw9InVybCgjU1ZHSURfMV8pIiBzdHlsZT0iIj48L2NpcmNsZT48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zMzEgMTY2YzAtNDEuMzU1LTMzLjY0NS03NS03NS03NXMtNzUgMzMuNjQ1LTc1IDc1IDMzLjY0NSA3NSA3NSA3NSA3NS0zMy42NDUgNzUtNzV6bS03NSA3NWMtNzQuNDM5IDAtMTM1IDYwLjU2MS0xMzUgMTM1djE0LjA1OGMwIDQuMjY0IDEuODE0IDguMzI2IDQuOTkgMTEuMTcxIDM2LjUzOCAzMi43NCA4Mi43MSA1MC43NzEgMTMwLjAxIDUwLjc3MSA0Ny4zMDEgMCA5My40NzMtMTguMDMxIDEzMC4wMS01MC43NzEgMy4xNzYtMi44NDUgNC45OS02LjkwOCA0Ljk5LTExLjE3MXYtMTQuMDU4YzAtNzQuNDM5LTYwLjU2MS0xMzUtMTM1LTEzNXoiIGZpbGw9InVybCgjU1ZHSURfMl8pIiBkYXRhLW9yaWdpbmFsPSJ1cmwoI1NWR0lEXzJfKSIgc3R5bGU9IiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
                />

                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
            */}
          </form>
        </div>
        {/* fin seccion user */}
      </div>

      <div>
        <b>
          {showPedidosState.loged ? (
            <>
              {usuario.pedidos === undefined || usuario.pedidos === null ? (
                <>
                  <div id="sinPedidos">No hay Pedidos</div>
                </>
              ) : (
                <PedidosList className="PedidosListComponent" />
              )}
            </>
          ) : null}
        </b>
        <b>
          {addPedidoState ? (
            <FormPedido
              userId={usuario._id}
              addPedido={addPedido}
              editPedidoState={editPedidoState}
              objetoPedido={objetoPedido}
              actualizarEstado={actualizarEstado}
              pedidoId={pedidoId}
              cerrarEditPedido={cerrarEditPedido}
              fetchUser={fetchClientUser}
              cerrarAddPedido={cerrarAddPedido}
            />
          ) : null}
        </b>

        <b>
          {editPedidoState ? (
            <FormPedido
              userId={usuario._id}
              addPedido={addPedido}
              editPedidoState={editPedidoState}
              objetoPedido={objetoPedido}
              actualizarEstado={actualizarEstado}
              pedidoId={pedidoId}
              cerrarEditPedido={cerrarEditPedido}
              fetchUser={fetchClientUser}
            />
          ) : null}
        </b>
      </div>
    </div>
  );
}

const handleClick = (event) => {
  console.log("click en el boton");
  store.removeNotification("1");
  // setUsuario({
  //   ...usuario,
  //   [event.target.name]: event.target.value,
  // });
};

//export default { getUserId, User };
export default { User };
