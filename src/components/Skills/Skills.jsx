import React from "react";
import "./Skills.css";

export default function Skills() {
  //   const [menuItems, setMenuItems] = useState([]);

  return (
    <div className="Skills-container">
      <h3>HTML</h3>
      <div className="container">
        <div className="skills html">90%</div>
      </div>

      <h3>CSS</h3>
      <div className="container">
        <div className="skills css"></div>
      </div>

      <h3>JavaScript</h3>
      <div className="container">
        <div className="skills js"></div>
      </div>

      <h3>PHP</h3>
      <div className="container">
        <div className="skills php"></div>
      </div>
    </div>
  );
}
