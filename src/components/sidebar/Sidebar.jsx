import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("active");
  let act = "active";
  function handleclick() {
    setActive("");
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink
              to="/main"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <LineStyle className="sidebarIcon" />
              Home
            </NavLink>
            <NavLink
              to="/analytics"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <Timeline className="sidebarIcon" />
              Analytics
            </NavLink>
            <NavLink
              to="/sales"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <TrendingUp className="sidebarIcon" />
              Sales
            </NavLink>
            {/* segunda parte */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink
              to="/users"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <div className="bolita blue"></div>
              <PermIdentity className="sidebarIcon" />
              Users
            </NavLink>

            <NavLink
              to="/products"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <div className="bolita red"></div>
              <Storefront className="sidebarIcon" />
              Products
            </NavLink>

            <NavLink
              to="/transactions"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <AttachMoney className="sidebarIcon" />
              Transactions
            </NavLink>

            <NavLink
              to="/reports"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <BarChart className="sidebarIcon" />
              Reports
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <NavLink
              to="/mail"
              className="link sidebarListItem"
              activeClassName="actived"
            >
              <MailOutline className="sidebarIcon" />
              Mail
            </NavLink>

            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
