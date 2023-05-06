import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiGitBranch } from "react-icons/bi";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { FaBars, FaChalkboardTeacher, FaNewspaper } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdSubject } from "react-icons/md";
import { BsFillCalendar2EventFill, BsPeopleFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { RiVideoFill } from "react-icons/ri";
import { HiBuildingLibrary } from "react-icons/hi2";
import { AiFillGold } from "react-icons/ai";



const Sidebar = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
   
   

  const Menus = [
    { title: "Dashboard", icon: MdDashboard, route: "/admin/dashboard" },
    {
      title: "Students",
      icon: BsPeopleFill,
      gap: true,
      route: "/admin/students",
    },
    { title: "Tutors", icon: FaChalkboardTeacher, route: "/admin/tutors" },
    { title: "Notes", icon: GiNotebook, gap: true, route: "/admin/notes" },
    { title: "Videos", icon: RiVideoFill, route: "/admin/videos" },
    {
      title: "Question Papers",
      icon: FaNewspaper,
      route: "/admin/question-papers",
    },
    { title: "Plans", icon: AiFillGold, route: "/admin/plans" },
    { title: "Events", icon: BsFillCalendar2EventFill, route: "/admin/events" },
    {
      title: "Board",
      icon: HiBuildingLibrary,
      gap: true,
      route: "/admin/board",
    },
    { title: "Branch", icon: BiGitBranch, route: "/admin/branch" },
    { title: "Subject", icon: MdSubject, route: "/admin/subject" },
  ];
  return (
    <>
       

      <div className="bg-dark-purple w-full h-20 flex justify-between items-center">
        
          <Button className="ml-4" variant={"unstyled"} onClick={onOpen}>
            <FaBars className="text-white" />
          </Button>
        
      </div>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} closeOnEsc>
        <DrawerOverlay />
        <DrawerContent bg={"blue.900"} color={"white"}>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={"azure"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={() => navigate("/admin/dashboard")}
            textAlign={"center"}
          >
            EDU-HELP <br />
            <small>ADMIN</small>
          </DrawerHeader>
          <DrawerBody color={"white"}>
             
            <List spacing={6} marginTop={"5"}>
              {Menus.map((item, index) => {
                return (
                  <ListItem key={index} fontSize={"md"} fontWeight={"bold"}>
                    <Link to={item.route}>
                      <Flex alignItems={"center"} gap={3} className="uppercase">
                        <ListIcon as={item.icon} color="green.300" />
                        {item.title}
                      </Flex>
                    </Link>
                  </ListItem>
                );
              })}
              <ListItem
                fontSize={"md"}
                fontWeight={"bold"}
                color={"red.500"}
                onClick={() => {
                  localStorage.removeItem("Adtoken");
                  navigate("/admin");
                }}
                cursor={"pointer"}
              >
                <Flex alignItems={"center"} gap={3}>
                  <ListIcon as={FiLogOut} color="red.500" />
                  LOGOUT
                </Flex>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
