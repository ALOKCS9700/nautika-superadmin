import React from "react";
import { useSelector } from "react-redux";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./TopMenu.css";
import TopMenuAccount from "./TopMenuAccount";

const TopMenu: React.FC = () => {
  const page: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

  return (
    <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <TopMenuAccount />
      </ul>
    </nav>
  );
};

export default TopMenu;
