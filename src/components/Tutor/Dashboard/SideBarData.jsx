import React from "react";
import {  FaNewspaper, FaStickyNote, FaUserEdit } from "react-icons/fa";
import { AiFillSetting} from "react-icons/ai";
import {MdDashboard, MdVideoLibrary} from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { BsCalendar2EventFill, BsChatLeftTextFill } from "react-icons/bs";

export const SideBarData = [
  {
    title: "DASHBOARD",
    path: "/tutor/dashboard",
    icon: MdDashboard,
  },
  {
    title: "UPDATE PROFILE",
    path: "/tutor/edit-profile",
    icon: FaUserEdit,
  },
  {
    title: "YOUR UPLOADS",
    path: "/tutor/uploads",
    icon: IoMdCloudUpload,
  },
  {
    title: "CHAT",
    path: "/tutor/chat",
    icon: BsChatLeftTextFill,
  },
  {
    title: "UPLOAD NOTES",
    path: "/tutor/upload-notes",
    icon: FaStickyNote,
  },
  {
    title: "UPLOAD VIDEOS",
    path: "/tutor/upload-videos",
    icon: MdVideoLibrary,
  },
  {
    title: "UPLOAD QUESTIONS",
    path: "/tutor/upload-questions",
    icon: FaNewspaper,
  },
  {
    title: "ADD EVENTS",
    path: "/tutor/add-events",
    icon: BsCalendar2EventFill,
  },
  {
    title: "SETTINGS",
    path: "/tutor/settings",
    icon: AiFillSetting,
  },
  
];

export default SideBarData;
