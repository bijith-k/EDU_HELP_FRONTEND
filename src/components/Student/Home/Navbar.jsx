import * as React from "react";

import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Notes",
    href: "/notes",
  },

  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Plans",
    href: "/plans",
  },
  {
    label: "Tutors",
    href: "/tutors",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Upload",
    subMenu: [
      {
        label: "Upload Notes",
        href: "/upload-notes",
      },
      {
        label: "Upload Videos",
        href: "/upload-videos",
      },
      {
        label: "Upload Question Papers",
        href: "/upload-question-paper",
      },
      {
        label: "Add Events",
        href: "/add-events",
      },
    ],
  },
  {
    label: "Account",
    subMenu: [
      {
        label: "My Profile",
        href: "/profile",
      },
      {
        label: "Favourites",
        href: "/favourites",
      },
      {
        label: "Chats",
        href: "/chats",
      },
      {
        label: "My Uploads",
        href: "/my-uploads",
      },
      {
        label: "Settings",
        href: "/settings",
      },
    ],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      className="bg-[#232946] text-white "
      // bg={bg}
      boxShadow="md"
      py={4}
      px={8}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="sticky"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            EDU-HELP
          </Text>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={<FiMenu />}
            variant="ghost"
            aria-label="Toggle mobile menu"
            onClick={onOpen}
          />
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Stack
            direction="row"
            spacing={8}
            className="flex items-center cursor-pointer"
          >
            {menuItems.map((item, index) =>
              item.subMenu ? (
                <Menu key={index}>
                  <MenuButton
                    as={Button}
                    rightIcon={<FiChevronDown />}
                    variant="unstyled"
                  >
                    <span className="font-bold ">{item.label}</span>
                  </MenuButton>
                  <MenuList className="bg-white text-dark-purple">
                    <MenuGroup title={item.label}>
                      {item.subMenu.map((subItem, index) => (
                        <MenuItem key={index}>
                          <span onClick={() => navigate(subItem.href)}>
                            {subItem.label}
                          </span>
                        </MenuItem>
                      ))}
                    </MenuGroup>
                  </MenuList>
                </Menu>
              ) : (
                 
                <span className="font-bold" onClick={() => navigate(item.href)}>
                  {item.label}
                </span>
                
              )
            )}
          </Stack>
        </Box>
        <Box>
          <Text
            fontSize="sm"
            fontWeight="bold"
            className="bg-[#eebbc3] cursor-pointer text-[#232946] p-2 rounded-md"
            onClick={() => {
              localStorage.removeItem("Stoken");
              navigate("/signin");
            }}
          >
            LOGOUT
          </Text>
        </Box>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>EDU-HELP</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {menuItems.map((item, index) =>
                item.subMenu ? (
                  <Menu key={index}>
                    <MenuButton
                      as={Button}
                      rightIcon={<FiChevronDown />}
                      variant="ghost"
                    >
                      {item.label}
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title={item.label}>
                        {item.subMenu.map((subItem) => (
                          <MenuItem onClick={() => navigate(subItem.href)}>
                            {subItem.label}
                          </MenuItem>
                        ))}
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button onClick={() => navigate(item.href)} variant="ghost">
                    {item.label}
                  </Button>
                )
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
