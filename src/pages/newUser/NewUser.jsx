import "./newUser.css";
import Menu from "../../components/menu/menu";
import { FormNewUser } from "../../components/formNewUser/formNewUser";
import React, { useState, useEffect } from "react";

const itemsTest = [
  { name: "Todos los usuarios", link: "/users" },
  { name: "+ Crear Usuario", link: "/users/NewUser" },
];

export default function NewUser() {
  return (
    <>
      <Menu menuItems={itemsTest} />
      <FormNewUser></FormNewUser>
    </>
  );
}
