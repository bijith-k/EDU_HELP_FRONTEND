import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import { IconContext } from "react-icons";
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
import { IoMdHome } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sideBar);
  const navigate = useNavigate()
  return (
    <>
      
      <div className="bg-gray-800 w-full h-20 flex justify-between items-center">
        <div className="ml-4">
          <Button variant={"unstyled"} onClick={onOpen}>
            <FaIcons.FaBars className="text-white" />
          </Button>
        </div>
        <div
          className="text-2xl text-white font-bold ml-auto p-5 cursor-pointer"
          onClick={() => navigate("/tutor/dashboard")}
        >
          EDU-HELP
        </div>
      </div>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} closeOnEsc>
        <DrawerOverlay />
        <DrawerContent bg={"gray.700"} color={"white"}>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={"azure"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={() => navigate("/tutor/dashboard")}
            textAlign={"center"}
          >
            EDU-HELP
          </DrawerHeader>
          <DrawerBody color={"white"}>
           
            <List spacing={6} marginTop={"5"}>
              {SideBarData.map((item, index) => {
                return (
                  <ListItem key={index} fontSize={"md"} fontWeight={"bold"}>
                    <Link to={item.path}>
                      <Flex alignItems={"center"} gap={3}>
                        <ListIcon as={item.icon} color="gray.300" />
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
                  localStorage.removeItem("Ttoken");
                  localStorage.removeItem("Tid");
                  navigate("/tutor");
                }}
                cursor={"pointer"}
              >
                <Flex alignItems={"center"} gap={3}>
                  <ListIcon as={FiLogOut} color="red.500" />
                  LOGOUT
                </Flex>
              </ListItem>
              {/* <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Assumenda, quia temporibus eveniet a libero incidunt suscipit
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem> */}
              {/* You can also use custom icons from react-icons */}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
