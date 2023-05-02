import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ragam from "../../../assets/control.png";
import student from "../../../assets/student.png";
import dashboard from "../../../assets/dashboard.png";
import tutor from "../../../assets/tutors.png";
import notes from "../../../assets/books.png";
import videos from "../../../assets/videos.png";
import question from "../../../assets/questionPaper.png";
import events from "../../../assets/events.png";
import board from "../../../assets/board.png";
import branch from "../../../assets/branch.png";
import subject from "../../../assets/subject.png";
import { useDispatch, useSelector } from "react-redux";
import { selectedIcon } from "../../../features/sidebarSlice";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.sidebar);

  const handleIconClick = (iconIndex) => {
    dispatch(selectedIcon(iconIndex));
  };

  const Menus = [
    { title: "Dashboard", src: dashboard, route: "/admin/dashboard" },
    { title: "Students", src: student, gap: true, route: "/admin/students" },
    { title: "Tutors", src: tutor, route: "/admin/tutors" },
    { title: "Notes", src: notes, gap: true, route: "/admin/notes" },
    { title: "Videos", src: videos, route: "/admin/videos" },
    {
      title: "Question Papers",
      src: question,
      route: "/admin/question-papers",
    },
    { title: "Events", src: events, route: "/admin/events" },
    { title: "Board", src: board, gap: true, route: "/admin/board" },
    { title: "Branch", src: branch, route: "/admin/branch" },
    { title: "Subject", src: subject, route: "/admin/subject" },
    { title: "Plans", src: events, route: "/admin/plans" },
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 min-h-screen p-5 pt-8 bg-dark-purple relative`}
      >
        <img
          src={ragam}
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={ragam}
            className={`cursor-pointer duration-500 w-10 ${
              open && "rotate-[360deg]"
            }`}
            alt=""
          />

          <h1
            className={`text-white origin-left font-bold text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            ADMIN
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md 
            ${menu.gap ? "mt-8" : "mt-2"} ${
                index === selected.selectedIconIndex && "bg-light-white"
              }`}
              onClick={() => {
                handleIconClick(index);
                setTitle(menu.title);
                navigate(menu.route);
              }}
            >
              <img src={menu.src} className="w-10" />
              {/* {!open && <div className='bg-gray-400 text-white p-2 rounded-md'>{menu.title}</div>} */}
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 font-semibold`}
              >
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="my-6 w-8 bg-red-500 text-white p-3 rounded-md"
          onClick={() => {
            localStorage.removeItem("Adtoken");
            navigate("/admin");
          }}
        >
          <BiLogOut />
        </button>
      </div>
      {/* <div className='p-7 text-2xl font-semibold flex-1 h-screen '>
        <h1>{title}</h1>
      </div> */}
    </div>
  );
};

export default Sidebar;
