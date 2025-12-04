import React, { useEffect, useState } from "react";
import {
  ChartBar,
  ChatCenteredDots,
  Bell,
  User,
  LineVertical,
} from "@phosphor-icons/react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";

const navigations = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <ChartBar size={14} />,
    path: "/",
  },
  {
    key: "notification",
    label: "Notifications",
    icon: <ChatCenteredDots size={14} />,
    path: "/notifications",
  },
];

const Header = () => {
  const [menus, setMenus] = useState(navigations);
  const [seletedMenu, setSelectedMenu] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.split("/")[1]) {
      setSelectedMenu("notification");
    } else {
      setSelectedMenu("dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="header">
      <span className="header_icon">Notification Management</span>
      <div className="header_menus">
        {menus.map((item) => (
          <div
            className="header_menu"
            key={item.path}
            style={{
              color: seletedMenu === item.key ? "#B21C64" : "#737791",
            }}
            onClick={() => navigate(item.path)}
          >
            {item.icon} <span className="header_menu_label">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="header_right">
        <div className="header_right_icon_wrapper">
          <Bell size={14} />
        </div>
        <LineVertical size={16} color="#737791" />
        <div className="header_right_user">
          <div className="header_right_icon_wrapper">
            <User size={14} />
          </div>
          <span className="header_right_user_name">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
