import React, { useState, useEffect } from "react";
import "./notify.css";
import "./formNewUser.css";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  errorNotification,
  successNotification,
} from "../notifications/notifications";
import { useHistory } from "react-router-dom";

export function FormNewUser() {
  useEffect(() => {
    document.querySelector(`button[name="male"]`).className =
      "selectButton selected";
  }, []);
  const [newClientUser, setnewClientUser] = useState({
    name: {
      first: "",
      last: "",
    },
    contact: {
      gender: "male",
    },
  });

  const [inputError, setInputError] = useState({
    first: { value: false, class: "inputContainer errorInput" },
    last: { value: false, class: "inputContainer errorInput" },
    userName: { value: false, class: "inputContainer errorInput" },
    email: { value: false, class: "inputContainer errorInput" },
    phone: { value: false, class: "inputContainer errorInput" },
    edad: { value: false, class: "inputContainer errorInput" },
  });

  let history = useHistory();
  const enviarDatos = (event) => {
    event.preventDefault();
    // axios({bounceOut
    //   method: "post",
    //   url: "http://localhost:3003/api/createTrigger",
    //   data: usuario,
    // });

    if (newClientUser.name.first === "" || newClientUser.name.last === "") {
      let clasefirst, claselast;
      newClientUser.name.first === ""
        ? (clasefirst = "inputContainer errorInput")
        : (clasefirst = "inputContainer successInput");
      newClientUser.name.last === ""
        ? (claselast = "inputContainer errorInput")
        : (claselast = "inputContainer successInput");
      setInputError({
        ...inputError,
        ...{
          first: {
            value: true,
            class: clasefirst,
          },
          last: {
            value: true,
            class: claselast,
          },
        },
      });
    } else {
      fetch(`http://localhost:3003/clients/`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClientUser),
      })
        .then((response) => response.json())
        .then((data) => {
          successNotification({
            message: "Cliente creado exitosamente",
            width: 400,
            position: "top-right",
          });
          history.push("/users");
          // fetchClientUser();
        })
        .catch((error) => {
          errorNotification({
            message: "Error al guardar cliente en la base de datos",
            width: 380,
          });
        });
    }
  };

  const handleGeneroButton = (event) => {
    event.preventDefault();

    const valor = event.target.name;

    const contact = {
      ...newClientUser.contact,
      ...{ gender: event.target.name },
    };
    setnewClientUser({
      ...newClientUser,
      ...{ contact: contact },
    });

    if (valor === "male" || valor === "female" || valor === "unknow") {
      let botonAplastado = document.querySelector(`button[name="${valor}"]`);

      document.querySelector(`button[name="male"]`).className = "selectButton";
      document.querySelector(`button[name="female"]`).className =
        "selectButton";
      document.querySelector(`button[name="unknow"]`).className =
        "selectButton";
      botonAplastado.className = "selectButton selected";
    }
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);

    // empieza la validacion de errores
    if (event.target.name === "first" || event.target.name === "last") {
      if (event.target.value === "") {
        const first = {
          ...inputError[event.target.name],
          ...{ value: true, class: "inputContainer errorInput" },
        };
        setInputError({
          ...inputError,
          ...{ [event.target.name]: first },
        });
      } else {
        setInputError({
          ...inputError,
          ...{
            [event.target.name]: {
              value: true,
              class: "inputContainer successInput",
            },
          },
        });
      }
    } else if (event.target.name === "email") {
      if (event.target.value === "" || !event.target.value.includes("@")) {
        const first = {
          ...inputError[event.target.name],
          ...{ value: true, class: "inputContainer errorInput" },
        };
        setInputError({
          ...inputError,
          ...{ [event.target.name]: first },
        });
      } else {
        setInputError({
          ...inputError,
          ...{
            [event.target.name]: {
              value: true,
              class: "inputContainer successInput",
            },
          },
        });
      }
    } else if (event.target.name === "phone") {
      if (
        event.target.value === "" ||
        event.target.value.length > 10 ||
        !event.target.value.match(/^[0-9]+$/)
      ) {
        const first = {
          ...inputError[event.target.name],
          ...{ value: true, class: "inputContainer errorInput" },
        };
        setInputError({
          ...inputError,
          ...{ [event.target.name]: first },
        });
      } else {
        setInputError({
          ...inputError,
          ...{
            [event.target.name]: {
              value: true,
              class: "inputContainer successInput",
            },
          },
        });
      }
    }

    if (event.target.name === "first" || event.target.name === "last") {
      const name = {
        ...newClientUser.name,
        ...{ [event.target.name]: event.target.value },
      };
      setnewClientUser({
        ...newClientUser,
        ...{ name: name },
      });
      // console.log("update user desde primer if ", newClientUser);
    } else if (
      event.target.name === "email" ||
      event.target.name === "phone" ||
      event.target.name === "homeAdress" ||
      event.target.name === "city" ||
      // event.target.name === "gender" ||
      event.target.name === "age"
    ) {
      const contact = {
        ...newClientUser.contact,
        ...{ [event.target.name]: event.target.value },
      };
      setnewClientUser({
        ...newClientUser,
        ...{ contact: contact },
      });
    } else {
      setnewClientUser({
        ...newClientUser,
        [event.target.name]: event.target.value,
      });
    }
  };
  return (
    <>
      <div className="pedidoFormContainer">
        <form onSubmit={enviarDatos}>
          <div className="flexContainerVertical">
            <span className="formTitle">Añadir Cliente</span>
            <span className="formSubtitle">Profile</span>
            <span className="formDescription">
              Todos los datos se agregaran al perfil del cliente
            </span>

            <div className="flexContainerHorizontal">
              <span className="formThirdTitle">First Name*</span>
              <span className="formThirdTitle">Last Name*</span>
            </div>
            <div className="flexContainerHorizontal">
              <div
                className={
                  inputError.first.value === false
                    ? "inputContainer"
                    : inputError.first.class
                }
                errr_msg="Campo Obligatorio"
              >
                <input
                  type="text"
                  placeholder="John"
                  name="first"
                  onChange={handleInputChange}
                />
                <CheckCircleIcon className="CheckIcon" />
              </div>
              <div
                className={
                  inputError.last.value === false
                    ? "inputContainer"
                    : inputError.last.class
                }
                errr_msg="Campo Obligatorio"
              >
                <input
                  type="text"
                  placeholder="Smith"
                  name="last"
                  onChange={handleInputChange}
                />
                <CheckCircleIcon className="CheckIcon" />
              </div>
            </div>

            <div className="flexContainerHorizontal">
              <span className="formThirdTitle">Username</span>
              <span className="formThirdTitle">Email</span>
            </div>
            <div className="flexContainerHorizontal">
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="Don John"
                  name="userName"
                  onChange={handleInputChange}
                />
                <CheckCircleIcon className="CheckIcon" />
              </div>
              <div
                className={
                  inputError.email.value === false
                    ? "inputContainer"
                    : inputError.email.class
                }
                errr_msg="Debes ingresar un correo electrónico"
              >
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  name="email"
                  onChange={handleInputChange}
                />
                <CheckCircleIcon className="CheckIcon" />
              </div>
            </div>

            <div className="flexContainerHorizontal">
              <span className="formThirdTitle">
                Phone{" "}
                <span className="spanIndicaciones">(Máximo 10 números)</span>
              </span>

              <span className="formThirdTitle">Dirección</span>
            </div>
            <div className="flexContainerHorizontal">
              <div
                className={
                  inputError.phone.value === false
                    ? "inputContainer"
                    : inputError.phone.class
                }
                errr_msg="Solo se permiten valores numéricos"
              >
                <input
                  type="text"
                  placeholder="0987959626"
                  name="phone"
                  onChange={handleInputChange}
                />
                <CheckCircleIcon className="CheckIcon" />
              </div>
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="limones y naranjas"
                  name="homeAdress"
                  onChange={handleInputChange}
                />
                <CheckCircleIcon className="CheckIcon" />
              </div>
            </div>

            <div className="flexContainerHorizontal">
              <span className="formThirdTitle">Ciudad</span>
              <span className="formThirdTitle">Edad</span>
            </div>
            <div className="flexContainerHorizontal">
              <input
                type="text"
                placeholder="Ambato"
                name="city"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="30"
                name="age"
                onChange={handleInputChange}
              />
            </div>

            <label className="formThirdTitle">Género</label>

            <div className="flexContainerHorizontalWrap">
              <button
                type="button"
                name="male"
                onClick={(event) => handleGeneroButton(event)}
                className="selectButton"
              >
                Hombre
              </button>
              <button
                type="button"
                name="female"
                onClick={(event) => handleGeneroButton(event)}
                className="selectButton"
              >
                Mujer
              </button>
              <button
                type="button"
                name="unknow"
                onClick={(event) => handleGeneroButton(event)}
                className="selectButton"
              >
                Desconocido
              </button>
            </div>

            <button className="formSubmitButton">Enviar</button>
          </div>
        </form>
      </div>
    </>
  );
}
