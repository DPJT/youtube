import React, { useState, useEffect } from "react";
import "./notify.css";
import "./formPedido.css";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  errorNotification,
  successNotification,
} from "../notifications/notifications";
import { utcToLocal } from "../../services/utcToLocal";
import { obtenerFechaActual } from "../../services/fechaUTCActual";

import { SelectInput } from "../SelectorInput/SelectInput";

export function FormPedido({
  userId,
  addPedido,
  editPedidoState,
  objetoPedido,
  actualizarEstado,
  pedidoId,
  cerrarEditPedido,
  cerrarAddPedido,
  fetchUser,
}) {
  const [newpedido, setNewpedido] = useState({
    detalles: "",
    status: "solicitado",
    products: [],
    pago: {
      status: "pendiente",
      total: 0,
      abono: 0,
      descuento: 0,
      actual: 0,
    },
    clientId: userId,
    entrega: {
      tipo: "retiro",
      status: "pendiente",
      fecha: obtenerFechaActual().substring(0, 16),
      ciudad: "Ambato",
      direccion: "Local De Nazion",
    },
  });

  const [yesEntrega, setYesEntrega] = useState(false);
  const [timeAgoState, setTimeAgoState] = useState();

  useEffect(() => {
    actualizarEstado(setNewpedido);
    if (editPedidoState) {
      document.querySelector(`button[name="solicitado"]`).className =
        "selectButton";
      document.querySelector(`button[name="confirmado"]`).className =
        "selectButton";
      document.querySelector(`button[name="completado"]`).className =
        "selectButton";
      document.querySelector(`button[name="cancelado"]`).className =
        "selectButton";
      document.querySelector(`button[name="${newpedido.status}"]`).className =
        "selectButton selected";

      document.querySelector(`button[name="pendiente"]`).className =
        "selectButton";
      document.querySelector(`button[name="completo"]`).className =
        "selectButton";
      document.querySelector(`button[name="reembolsado"]`).className =
        "selectButton";
      document.querySelector(
        `button[name="${newpedido.pago.status}"]`
      ).className = "selectButton selected";
    }
  }, [newpedido]);

  useEffect(() => {
    document.querySelector(`button[name="solicitado"]`).className =
      "selectButton selected";
    document.querySelector(`button[name="pendiente"]`).className =
      "selectButton selected";

    const formulario = document.getElementById("formNewPedido");
    window.scrollTo({
      top: formulario.offsetTop,
      behavior: "smooth",
    });
  }, []);

  const modificarTimeAgoState = (fecha) => {
    setTimeAgoState(fecha);
  };

  const assignClientToPedido = (pedidoId) => {
    fetch(`http://localhost:3003/pedidos/assignClient/${pedidoId}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: "60efd377c84bfc21b01dd49b",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Cliente asignado al pedido con exito con exito",
          width: 400,
        });
        cerrarEditPedido();
        fetchUser();
      })
      .catch((error) => {
        errorNotification({
          message: "No se pudo asignar el cliente al pedido",
          width: 400,
        });
      });
  };
  const aggignPedidoToClient = (pedidId) => {
    fetch(`http://localhost:3003/clients/assignpedido/${userId}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pedidoId: pedidId }),
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Pedido asignado al cliente con exito con exito",
          width: 400,
        });
        // cerrarEditPedido();
        fetchUser();
      })
      .catch((error) => {
        errorNotification({
          message: "No se pudo asignar el pedido al cliente",
          width: 400,
        });
      });
  };
  const createPedido = (event) => {
    console.log("este es el objeto para actualiz", newpedido);
    event.preventDefault();

    fetch(`http://localhost:3003/pedidos/`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newpedido),
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Completado con exito",
          width: 400,
        });
        cerrarAddPedido();

        // assignClientToPedido(data.pedido._id);

        aggignPedidoToClient(data.pedido._id);
        // cerrarEditPedido();
        // fetchUser();
      })
      .catch((error) => {
        errorNotification({
          message: "No se pudo crear el pedido",
          width: 400,
        });
      });
  };

  const updatePedido = (event) => {
    console.log("este es el objeto para actualiz", newpedido);
    event.preventDefault();

    fetch(`http://localhost:3003/pedidos/${newpedido._id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newpedido),
    })
      .then((response) => response.json())
      .then((data) => {
        successNotification({
          message: "Completado con exito",
          width: 400,
        });
        cerrarEditPedido();
        fetchUser();
      })
      .catch((error) => {
        errorNotification({
          message: "No se pudo actualizar el pedido",
          width: 400,
        });
      });
  };

  const handleStatusClick = (event) => {
    event.preventDefault();
    let valor = event.target.name;

    if (
      valor === "solicitado" ||
      valor === "confirmado" ||
      valor === "completado" ||
      valor === "cancelado"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="solicitado"]`).className =
        "selectButton";
      document.querySelector(`button[name="confirmado"]`).className =
        "selectButton";
      document.querySelector(`button[name="completado"]`).className =
        "selectButton";
      document.querySelector(`button[name="cancelado"]`).className =
        "selectButton";
      botonAplastado.className = "selectButton selected";
      setNewpedido({
        ...newpedido,
        ...{ status: valor },
      });
    } else if (
      valor === "pendiente" ||
      valor === "completo" ||
      valor === "reembolsado"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="pendiente"]`).className =
        "selectButton";
      document.querySelector(`button[name="completo"]`).className =
        "selectButton";
      document.querySelector(`button[name="reembolsado"]`).className =
        "selectButton";
      botonAplastado.className = "selectButton selected";

      const pago = {
        ...newpedido.pago,
        ...{ status: valor },
      };
      setNewpedido({
        ...newpedido,
        ...{ pago: pago },
      });
    } else if (valor === "entrega" || valor === "envio" || valor === "retiro") {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="entrega"]`).className =
        "selectButton";
      document.querySelector(`button[name="envio"]`).className = "selectButton";
      document.querySelector(`button[name="retiro"]`).className =
        "selectButton";
      botonAplastado.className = "selectButton selected";
      const entrega = {
        ...newpedido.entrega,
        ...{ tipo: valor },
      };
      setNewpedido({
        ...newpedido,
        ...{ entrega: entrega },
      });
    } else if (
      valor === "entregado" ||
      valor === "enviado" ||
      valor === "retirado" ||
      valor === "pendienteEntrega"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);
      document.querySelector(`button[name="pendienteEntrega"]`).className =
        "selectButton";
      document.querySelector(`button[name="entregado"]`).className =
        "selectButton";
      document.querySelector(`button[name="enviado"]`).className =
        "selectButton";
      document.querySelector(`button[name="retirado"]`).className =
        "selectButton";
      botonAplastado.className = "selectButton selected";

      if (valor === "pendienteEntrega") {
        valor = "pendiente";
      }
      const entrega = {
        ...newpedido.entrega,
        ...{ status: valor },
      };
      setNewpedido({
        ...newpedido,
        ...{ entrega: entrega },
      });
    }
  };

  const handleInputChangeAddPedido = (event) => {
    var otherCheckbox = document.querySelector('input[value="other"]');

    otherCheckbox.addEventListener("change", () => {
      if (otherCheckbox.checked) {
        setYesEntrega(true);

        document.querySelector(`button[name="retiro"]`).className =
          "selectButton selected";
        document.querySelector(`button[name="pendienteEntrega"]`).className =
          "selectButton selected";

        const entrega = document.getElementById("pedidoSeccionEntrega");
        window.scrollTo({
          top: entrega.offsetTop,
          behavior: "smooth",
        });
      } else {
        setYesEntrega(false);
      }
    });

    if (
      event.target.name === "p-status" ||
      event.target.name === "p-abono" ||
      event.target.name === "p-total" ||
      event.target.name === "p-actual" ||
      event.target.name === "p-descuento"
    ) {
      console.log(event.target.value);
      const nombre = event.target.name.split("p-");
      const nombre1 = nombre[1];
      const pago = {
        ...newpedido.pago,
        ...{ [nombre1]: event.target.value },
      };
      setNewpedido({
        ...newpedido,
        ...{ pago: pago },
      });
    } else if (
      event.target.name === "e-tipo" ||
      event.target.name === "e-status" ||
      event.target.name === "e-direccion" ||
      event.target.name === "e-ciudad" ||
      event.target.name === "e-fecha"
    ) {
      const nombre = event.target.name.split("e-");
      const nombre1 = nombre[1];
      const entrega = {
        ...newpedido.entrega,
        ...{ [nombre1]: event.target.value },
      };
      setNewpedido({
        ...newpedido,
        ...{ entrega: entrega },
      });
    } else if (
      event.target.name === "email" ||
      event.target.name === "phone" ||
      event.target.name === "homeAdress" ||
      event.target.name === "city"
    ) {
      const contact = {
        ...newpedido.contact,
        ...{ [event.target.name]: event.target.value },
      };
      setNewpedido({
        ...newpedido,
        ...{ contact: contact },
      });
    } else {
      setNewpedido({
        ...newpedido,
        [event.target.name]: event.target.value,
      });

      console.log("new pedido desde el else", newpedido);
    }
  };
  return (
    <>
      <div className="formContainer">
        <form
          id="formNewPedido"
          onSubmit={
            editPedidoState
              ? (event) => updatePedido(event)
              : (event) => createPedido(event)
          }
        >
          {editPedidoState ? (
            <button className="formBotonCerrar" onClick={cerrarEditPedido}>
              x
            </button>
          ) : (
            <button className="formBotonCerrar" onClick={addPedido}>
              x
            </button>
          )}
          <div className="flexContainerVertical">
            {editPedidoState ? (
              <span className="formTitle">Editar Pedido</span>
            ) : (
              <span className="formTitle">Crear Pedido</span>
            )}
            <label className="formThirdTitle">Status</label>

            <div className="flexContainerHorizontalWrap">
              <button
                className="selectButton"
                name="solicitado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                solicitado
              </button>
              <button
                className="selectButton"
                name="confirmado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                confirmado
              </button>
              <button
                className="selectButton"
                name="completado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                completado
              </button>
              <button
                className="selectButton"
                name="cancelado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                cancelado
              </button>
            </div>

            <label className="formSubtitle">Detalles</label>
            <input
              id="inputNewPedido"
              type="text"
              placeholder="Escribe los detalles del pedido aqui"
              className="pedidoInputGeneral"
              name="detalles"
              onChange={handleInputChangeAddPedido}
              value={newpedido.detalles}
            />

            <label className="formSubtitle">Products</label>
            <input type="text" />

            <span className="formSubtitle">Pago</span>
            <span className="formDescription">
              En esta seccion puedes configurar los pagos
            </span>

            <label className="formThirdTitle">Status</label>

            <div className="flexContainerHorizontalWrap">
              <button
                className="selectButton"
                name="pendiente"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="p-status"
              >
                pendiente
              </button>
              <button
                className="selectButton"
                name="completo"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="p-status"
              >
                completo
              </button>
              <button
                className="selectButton"
                name="reembolsado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="p-status"
              >
                reembolsado
              </button>
            </div>
            <label className="formSubtitle">Cuentas</label>
            <div className="flexContainerHorizontal">
              <span className="pedidoPagoTitle">Total</span>
              <span className="pedidoPagoTitle">Abono</span>
              <span className="pedidoPagoTitle">Descuento</span>
              <span className="pedidoPagoTitle">Actual</span>
            </div>
            <div className="flexContainerHorizontal">
              <input
                id="inputNewPedido"
                type="text"
                name="p-total"
                onChange={handleInputChangeAddPedido}
                value={newpedido.pago.total}
              />
              <input
                id="inputNewPedido"
                type="text"
                name="p-abono"
                onChange={handleInputChangeAddPedido}
                value={newpedido.pago.abono}
              />
              <input
                id="inputNewPedido"
                type="text"
                name="p-descuento"
                onChange={handleInputChangeAddPedido}
                value={newpedido.pago.descuento}
              />
              <input
                id="inputNewPedido"
                type="text"
                name="p-actual"
                onChange={handleInputChangeAddPedido}
                value={newpedido.pago.actual}
              />
            </div>

            <span className="formSubtitle">Entrega</span>
            <span className="formDescription">
              Si no seleccionas esta opción por defecto se establecera en retiro
              del local.
            </span>
            {!yesEntrega ? (
              <>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={handleInputChangeAddPedido}
                    value="other"
                  />
                  <span className="slider round"></span>
                </label>
              </>
            ) : (
              <>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={handleInputChangeAddPedido}
                    value="other"
                  />
                  <span className="slider round"></span>
                </label>
                <label className="formSubtitle" id="pedidoSeccionEntrega">
                  Tipo
                </label>

                <div className="flexContainerHorizontalWrap">
                  <button
                    className="selectButton"
                    name="retiro"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-tipo"
                  >
                    retiro
                  </button>
                  <button
                    className="selectButton"
                    name="entrega"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-tipo"
                  >
                    entrega
                  </button>
                  <button
                    className="selectButton"
                    name="envio"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-tipo"
                  >
                    envio
                  </button>
                </div>

                <label className="formSubtitle">Status</label>

                <div className="flexContainerHorizontalWrap">
                  <button
                    className="selectButton"
                    name="pendienteEntrega"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-status"
                  >
                    pendiente
                  </button>
                  <button
                    className="selectButton"
                    name="entregado"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-status"
                  >
                    entregado
                  </button>
                  <button
                    className="selectButton"
                    name="enviado"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-status"
                  >
                    enviado
                  </button>
                  <button
                    className="selectButton"
                    name="retirado"
                    type="button"
                    onClick={(event) => handleStatusClick(event)}
                    id="e-status"
                  >
                    retirado
                  </button>
                </div>
                <div className="flexContainerHorizontal">
                  <label className="formSubtitle">Fecha</label>
                  <label className="formSubtitle">Ciudad</label>
                </div>
                <div className="flexContainerHorizontal">
                  <div className="inputContainer" errr_msg="Campo Obligatorio">
                    <span className="formDescription">
                      Selecciona la fecha de entrega del pedido
                    </span>
                    <input
                      type="datetime-local"
                      id="inputNewPedido"
                      name="e-fecha"
                      onChange={handleInputChangeAddPedido}
                      // value={newpedido.entrega.fecha}
                    />
                  </div>
                  <div className="inputContainer" errr_msg="Campo Obligatorio">
                    <span className="formDescription">
                      Escoge una ciudad de Ecuador
                    </span>
                    <input
                      placeholder="Ambato"
                      id="inputNewPedido"
                      type="text"
                      name="e-ciudad"
                      onChange={handleInputChangeAddPedido}
                      value={newpedido.entrega.ciudad}
                    />
                  </div>
                </div>
                {/* <label className="formSubtitle">Fecha</label>
                <span className="formDescription">
                  Selecciona la fecha de entrega del pedido
                </span>
                <input type="date" />

                <label className="formSubtitle">Ciudad</label>
                <input type="text" /> */}

                <label className="formSubtitle">Dirección</label>
                <input
                  id="inputNewPedido"
                  type="text"
                  className="pedidoInputGeneral"
                  name="e-direccion"
                  onChange={handleInputChangeAddPedido}
                  value={newpedido.entrega.direccion}
                />
              </>
            )}

            {editPedidoState ? (
              <button type="submit" className="formSubmitButton">
                Actualizar
              </button>
            ) : (
              <button type="submit" className="formSubmitButton">
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
