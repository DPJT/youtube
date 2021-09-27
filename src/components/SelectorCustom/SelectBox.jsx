import React, { useState } from "react";
import "./SelectBox.css";

export default function SelectBox({ items, funcion }) {
  // state = {
  //   items: this.props.items || [],
  //   showItems: false,
  //   selectedItem: this.props.items && this.props.items[0],
  // };

  const [itemss] = useState(items || []);
  const [showItems, setShowItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item) => {
    setShowItems(false);
    setSelectedItem(item);
    funcion(item.value);
  };

  return (
    <div className="select-box--box">
      <div className="select-box--container">
        <div className="select-box--selected-item">{selectedItem.value}</div>
        <div
          className={`${
            showItems ? "select-box--arrow open" : "select-box--arrow"
          }`}
          onClick={() => dropDown()}
        >
          <div className="arrow"></div>
          {/* <span
            className={`${
              showItems ? "select-box--arrow-up" : "select-box--arrow-down"
            }`}
          /> */}
        </div>

        <div
          style={{ display: showItems ? "block" : "none" }}
          className={"select-box--items"}
        >
          {itemss.map((item) => (
            <div
              key={item.id}
              onClick={() => selectItem(item)}
              className={selectedItem === item ? "selected" : ""}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// <SelectBox
//   items={[
//     { value: "United States", id: 1 },
//     { value: "Canada", id: 2 },
//     { value: "Mexico", id: 3 },
//     { value: "Japan", id: 4 },
//     { value: "Ecuador", id: 5 },
//   ]}
// />;
