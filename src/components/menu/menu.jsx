import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

export default function Menu(props) {
  //   const menuItems = props.menuItems;
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // const arrayItems = props.menuItems.split("separacion");
    // const arrayItemsObject = arrayItems.map((item) => {
    //   var itemParseado = JSON.parse(item);
    //   return itemParseado;
    // });

    setMenuItems(props.menuItems);
  }, []);
  //   const arrayItems = menuItems.cadena1.split(" ");
  console.log(props.menuItems);

  function handleClickDj() {
    let añadir = [{ name: "juju", link: "/uuuuu" }, ...menuItems];
    setMenuItems(añadir);
  }
  return (
    <div className="grid-container-nav">
      <div className="grid-item-nav">
        <nav className="nav">
          <ul className="nav__ul">
            {menuItems.map((item) => {
              return (
                <NavLink
                  to={item.link}
                  className="nav__li"
                  activeClassName="activedMenuItem"
                  key={item.name}
                >
                  {item.name}
                </NavLink>
              );
            })}
            {/* <button onClick={handleClickDj}>tgt</button> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
