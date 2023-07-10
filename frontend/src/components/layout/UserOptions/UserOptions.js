import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Dashboard, Person, ExitToApp, ListAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    {
      icon: <ListAlt />,
      name: "orders",
      func: orders,
    },
    {
      icon: <Person />,
      name: "Profile",
      func: account,
    },
    {
      icon: <ExitToApp />,
      name: "LogOut",
      func: logoutUser,
    },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    navigate("/logoutUser");
    alert.success("Logout Successfully");
  }
  function dashboard() {
    navigate("/dashboard");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img className="speedDialIcon" src={user?.avatar.url} alt="Profile" />
        }
      >
        {options.map((item, i) => (
          <SpeedDialAction
            key={i}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
