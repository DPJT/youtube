import React, { useState, useEffect } from "react";
import "./notify.css";
import "./newPedido.css";
import "react-notifications-component/dist/theme.css";
import "animate.css";

import { SelectInput } from "../SelectorInput/SelectInput";

export function NewPedidoForm({
  userId,
  addPedido,
  editPedidoState,
  objetoPedido,
  actualizarEstado,
  pedidoId,
  cerrarEditPedido,
}) {
  const [newpedido, setNewpedido] = useState({
    detalles: "",
    status: "solicitado",
    pago: { status: "pendiente" },
    entrega: { status: "", tipo: "retirar" },
  });

  const [yesEntrega, setYesEntrega] = useState(false);

  // useEffect(() => {
  //   // actualizarEstado(setNewpedido);

  //   const getOne = (id) => {
  //     const request = axios.get("http://localhost:3003/pedidos" + "/" + id);
  //     return request.then((response) => {
  //       return response.data;
  //     });
  //   };

  //   getOne(pedidoId).then((data) => {
  //     editPedidoState ? setNewpedido(data) : setNewpedido({ detalles: "" });
  //   });
  // }, []);

  useEffect(() => {
    document.querySelector(`button[name="solicitado"]`).className =
      "botonSelected";
    document.querySelector(`button[name="pendiente"]`).className =
      "botonSelected";
    actualizarEstado(setNewpedido);

    const formulario = document.getElementById("formNewPedido");
    // input.focus();
    window.scrollTo({
      top: formulario.offsetTop,
      behavior: "smooth",
    });
  }, []);

  const handleStatusClick = (event) => {
    event.preventDefault();
    const valor = event.target.name;

    if (
      valor === "solicitado" ||
      valor === "confirmado" ||
      valor === "completado" ||
      valor === "cancelado"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="solicitado"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="confirmado"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="completado"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="cancelado"]`).className =
        "newPedidoBotones2";
      botonAplastado.className = "botonSelected";
    } else if (
      valor === "pendiente" ||
      valor === "completo" ||
      valor === "reembolsado"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="pendiente"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="completo"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="reembolsado"]`).className =
        "newPedidoBotones2";
      botonAplastado.className = "botonSelected";
    } else if (
      valor === "entregar" ||
      valor === "enviar" ||
      valor === "retirar"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="entregar"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="enviar"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="retirar"]`).className =
        "newPedidoBotones2";
      botonAplastado.className = "botonSelected";
    } else if (
      valor === "entregado" ||
      valor === "enviado" ||
      valor === "retirado"
    ) {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="entregado"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="enviado"]`).className =
        "newPedidoBotones2";
      document.querySelector(`button[name="retirado"]`).className =
        "newPedidoBotones2";
      botonAplastado.className = "botonSelected";
    }

    if (
      event.target.id === "p-status" ||
      event.target.id === "p-tipo" ||
      event.target.id === "p-abono"
    ) {
      const nombre = event.target.id.split("p-");
      const nombre1 = nombre[1];
      const pago = {
        ...newpedido.pago,
        ...{ [nombre1]: event.target.name },
      };
      setNewpedido({
        ...newpedido,
        ...{ pago: pago },
      });
    } else if (event.target.id === "e-status" || event.target.id === "e-tipo") {
      const nombre = event.target.id.split("e-");
      const nombre1 = nombre[1];
      const entrega = {
        ...newpedido.entrega,
        ...{ [nombre1]: event.target.name },
      };
      setNewpedido({
        ...newpedido,
        ...{ entrega: entrega },
      });
    } else if (event.target.id === "status") {
      setNewpedido({
        ...newpedido,
        ...{ status: event.target.name },
      });
    } else {
    }
  };

  const handleInputChangeAddPedido = (event) => {
    var otherCheckbox = document.querySelector('input[value="other"]');

    otherCheckbox.addEventListener("change", () => {
      if (otherCheckbox.checked) {
        setYesEntrega(true);

        document.querySelector(`button[name="retirar"]`).className =
          "botonSelected";
        document.querySelector(`button[name="retirado"]`).className =
          "botonSelected";

        const entrega = document.getElementById("entregaNewPedido");
        // input.focus();
        window.scrollTo({
          top: entrega.offsetTop,
          behavior: "smooth",
        });
      } else {
        setYesEntrega(false);
      }
    });

    console.log("este es el cambio de los inputspedido", event.target);
    if (event.target.name === "p-status" || event.target.name === "p-abono") {
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
      event.target.name === "e-status"
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
      <div className="newPedidoContainer">
        {editPedidoState ? (
          <button className="newPedidoBoton-fecha" onClick={cerrarEditPedido}>
            x
          </button>
        ) : (
          <button className="newPedidoBoton-fecha" onClick={addPedido}>
            x
          </button>
        )}

        {editPedidoState ? (
          <span className="pedidoTitle">Edit Pedido</span>
        ) : (
          <span className="pedidoTitle">New Pedido</span>
        )}

        <form id="formNewPedido">
          <div className="pedidoForm">
            {/* <div className="pedidoItem">
              <label>Status</label>
              <SelectInput
                items={[
                  { value: "Solicitado", id: 1 },
                  { value: "Confirmado", id: 2 },
                  { value: "Completado", id: 3 },
                  { value: "Cancelado", id: 4 },
                ]}
              />
            </div> */}

            {/* desde aqui */}
            {/* <div className="pedidoItem">
              <label>Status</label>
              <input
                id="inputNewPedido"
                type="text"
                placeholder="Escribe los detalles del pedido aqui"
                className="newPedidoStatus"
                name="status"
                onChange={handleInputChangeAddPedido}
                value={newpedido.status}
              />
            </div> */}

            <div className="pedidoItem">
              <label>Status</label>

              <div className="butonsNewPedido">
                <input
                  id="inputNewPedido"
                  type="text"
                  placeholder="Escribe los detalles del pedido aqui"
                  className="newPedidoStatus"
                  name="status"
                  onChange={handleInputChangeAddPedido}
                  value={newpedido.status}
                />
                <button
                  className="newPedidoBotones2"
                  name="solicitado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="status"
                >
                  solicitado
                </button>
                <button
                  className="newPedidoBotones2"
                  name="confirmado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="status"
                >
                  confirmado
                </button>
                <button
                  className="newPedidoBotones2"
                  name="completado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="status"
                >
                  completado
                </button>

                <button
                  className="newPedidoBotones2"
                  name="cancelado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="status"
                >
                  cancelado
                </button>
              </div>
            </div>

            {/* desde aqui tocaaaaaaaaaaaaa */}
            {/* <div className="pedidoItem">
              <button
                className="newPedidoBotones"
                name="solicitado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                solicitado
              </button>
            </div>
            <div className="pedidoItem">
              <button
                className="newPedidoBotones"
                name="confirmado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                confirmado
              </button>
            </div>
            <div className="pedidoItem">
              <button
                className="newPedidoBotones"
                name="completado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                completado
              </button>
            </div>
            <div className="pedidoItem">
              <button
                className="newPedidoBotones"
                name="cancelado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="status"
              >
                cancelado
              </button>
            </div> */}
            {/* hasta aqui tocaria eliminar */}
          </div>
          <div className="pedidoForm">
            <div className="pedidoItem">
              <label>Detalles</label>
              <input
                id="inputNewPedido"
                type="text"
                placeholder="Escribe los detalles del pedido aqui"
                className="pedidoInputGeneral"
                name="detalles"
                onChange={handleInputChangeAddPedido}
                value={newpedido.detalles}
              />
            </div>
          </div>
          <div className="pedidoForm">
            <div className="pedidoItem">
              <label>Products</label>
              <input
                type="text"
                placeholder="pendiente"
                className="pedidoInputGeneral"
                name="p-status"
                onChange={handleInputChangeAddPedido}
              />
            </div>
          </div>

          <div className="pedidoItem1">
            <h3>Pago</h3>
            <label>Status</label>
            <div className="butonsNewPedido">
              <input
                id="inputNewPedido"
                type="text"
                placeholder="Escribe los detalles del pedido aqui"
                className="newPedidoStatus"
                name="p-status"
                onChange={handleInputChangeAddPedido}
                value={newpedido.pago.status}
              />
              <button
                className="newPedidoBotones2"
                name="pendiente"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="p-status"
              >
                pendiente
              </button>
              <button
                className="newPedidoBotones2"
                name="completo"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="p-status"
              >
                completo
              </button>
              <button
                className="newPedidoBotones2"
                name="reembolsado"
                type="button"
                onClick={(event) => handleStatusClick(event)}
                id="p-status"
              >
                reembolsado
              </button>
            </div>
            <div className="flexContainerBetween">
              <label>Abono</label>
              <label>Actual</label>
              <label>Descuento</label>
              <label>Total</label>
            </div>
            <div className="butonsNewPedido">
              <input type="text" className="pedidoInputPago" />
              <input type="text" className="pedidoInputPago" />
              <input type="text" className="pedidoInputPago" />
              <input type="text" className="pedidoInputPago" />
            </div>
            <h3 id="entregaNewPedido">Entrega</h3>
            <div className="pedidoItem">
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
                  <label>Tipo</label>
                  <div className="butonsNewPedido">
                    <input
                      id="inputNewPedido"
                      type="text"
                      placeholder="Escribe los detalles del pedido aqui"
                      className="newPedidoStatus"
                      name="e-tipo"
                      onChange={handleInputChangeAddPedido}
                      value={newpedido.entrega.tipo}
                    />
                    <button
                      className="newPedidoBotones2"
                      name="entregar"
                      type="button"
                      onClick={(event) => handleStatusClick(event)}
                      id="e-tipo"
                    >
                      entregar
                    </button>
                    <button
                      className="newPedidoBotones2"
                      name="enviar"
                      type="button"
                      onClick={(event) => handleStatusClick(event)}
                      id="e-tipo"
                    >
                      enviar
                    </button>
                    <button
                      className="newPedidoBotones2"
                      name="retirar"
                      type="button"
                      onClick={(event) => handleStatusClick(event)}
                      id="e-tipo"
                    >
                      retirar
                    </button>
                  </div>

                  <label>Fecha</label>

                  <input type="date" className="pedidoInputGeneral" />
                  <label>Ciudad</label>
                  <input type="text" className="pedidoInputGeneral" />
                  <label>Status</label>
                  <div className="butonsNewPedido">
                    <input
                      id="inputNewPedido"
                      type="text"
                      placeholder="Escribe los detalles del pedido aqui"
                      className="newPedidoStatus"
                      name="e-status"
                      onChange={handleInputChangeAddPedido}
                      value={newpedido.entrega.status}
                    />
                    <button
                      className="newPedidoBotones2"
                      name="entregado"
                      type="button"
                      onClick={(event) => handleStatusClick(event)}
                      id="e-status"
                    >
                      entregado
                    </button>
                    <button
                      className="newPedidoBotones2"
                      name="enviado"
                      type="button"
                      onClick={(event) => handleStatusClick(event)}
                      id="e-status"
                    >
                      enviado
                    </button>
                    <button
                      className="newPedidoBotones2"
                      name="retirado"
                      type="button"
                      onClick={(event) => handleStatusClick(event)}
                      id="e-status"
                    >
                      retirado
                    </button>
                  </div>
                  <label>Direccion</label>
                  <input type="text" className="pedidoInputGeneral" />
                </>
              )}

              <label className="switch">
                <input
                  type="checkbox"
                  onChange={handleInputChangeAddPedido}
                  value="other"
                />
                <span className="slider round"></span>
              </label>
              <label>Tipo</label>
              <div className="butonsNewPedido">
                <input
                  id="inputNewPedido"
                  type="text"
                  placeholder="Escribe los detalles del pedido aqui"
                  className="newPedidoStatus"
                  name="e-tipo"
                  onChange={handleInputChangeAddPedido}
                  value={newpedido.entrega.tipo}
                />
                <button
                  className="newPedidoBotones2"
                  name="entregar"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="e-tipo"
                >
                  entregar
                </button>
                <button
                  className="newPedidoBotones2"
                  name="enviar"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="e-tipo"
                >
                  enviar
                </button>
                <button
                  className="newPedidoBotones2"
                  name="retirar"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="e-tipo"
                >
                  retirar
                </button>
              </div>

              <label>Fecha</label>

              <input type="date" className="pedidoInputGeneral" />
              <label>Ciudad</label>
              <input type="text" className="pedidoInputGeneral" />
              <label>Status</label>
              <div className="butonsNewPedido">
                <input
                  id="inputNewPedido"
                  type="text"
                  placeholder="Escribe los detalles del pedido aqui"
                  className="newPedidoStatus"
                  name="e-status"
                  onChange={handleInputChangeAddPedido}
                  value={newpedido.entrega.status}
                />
                <button
                  className="newPedidoBotones2"
                  name="entregado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="e-status"
                >
                  entregado
                </button>
                <button
                  className="newPedidoBotones2"
                  name="enviado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="e-status"
                >
                  enviado
                </button>
                <button
                  className="newPedidoBotones2"
                  name="retirado"
                  type="button"
                  onClick={(event) => handleStatusClick(event)}
                  id="e-status"
                >
                  retirado
                </button>
              </div>
              <label>Direccion</label>
              <input type="text" className="pedidoInputGeneral" />
            </div>
          </div>

          {editPedidoState ? (
            <button className="userUpdateButton">Update</button>
          ) : (
            <button className="userUpdateButton">Enviar</button>
          )}
        </form>
      </div>
    </>
  );
}
