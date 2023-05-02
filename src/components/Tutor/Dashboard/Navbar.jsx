import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import { IconContext } from "react-icons";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sideBar);
  const navigate = useNavigate()
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div
          className="bg-blue-900 h-20 flex justify-start items-center w-full"
          id="navbar"
        >
          <Link
            to=""
            className="ml-8 font-medium bg-none text-black"
            id="menu-bars"
          >
            {!sideBar ? (
              <FaIcons.FaBars className="text-white" onClick={showSideBar} />
            ) : null}
          </Link>
          <div className="text-2xl text-white font-bold ml-auto p-5">
            EDU-HELP
          </div>
        </div>
        <nav
          className={
            sideBar
              ? "bg-blue-900 w-64 z-50 h-screen overflow-y-scroll  flex justify-center fixed top-0 left-0 transition duration-1000"
              : "bg-blue-900 w-64 h-screen overflow-y-scroll flex justify-center fixed top-0 -left-full transition duration-1000 "
          }
          id="nav-menu"
        >
          <ul className="w-full" id="nav-menu-items" onClick={showSideBar}>
            <li
              className="bg-blue-900 w-full h-20 flex justify-start items-center "
              id="navBar-toggle"
            >
              <Link
                to=""
                className="ml-8 font-medium bg-none text-black"
                id="menu-bars"
              >
                <AiIcons.AiOutlineClose className="text-white" />
              </Link>
            </li>
            {SideBarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-start items-center p-3 list-none h-16 hover:bg-black text-white"
                >
                  <Link
                    to={item.path}
                    className="font-base text-sm flex items-center py-4 rounded-lg"
                  >
                    {item.icon}
                    <span className="ml-8">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li
              className="text-white uppercase font-bold bg-red-600 p-2 text-center cursor-pointer"
              onClick={() => {
                localStorage.removeItem("Ttoken");
                localStorage.removeItem("Tid")
                navigate("/tutor");
              }}
            >
              logout
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
