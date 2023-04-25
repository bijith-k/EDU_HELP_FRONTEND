import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

 
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";


 

const BranchList = () => {
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();
  const [data, setData] = useState("data hereeeeee");
  const [order, setOrder] = useState("ASC");
  const [toastMessage, setToastMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`admin/boards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBoards(res.data.boards);
      });

    axios
      .get(`admin/branches`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => {
        console.log(res, "3");
        setBranches(res.data.branches);
      });
  }, [toastMessage]);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...boards].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBoards(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...boards].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBoards(sorted);
      setOrder("ASC");
    }
  };

  const sortingBranch = (col) => {
    if (order === "ASC") {
      const sorted = [...branches].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBranches(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...branches].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBranches(sorted);
      setOrder("ASC");
    }
  };

  const handleEdit = (branch) => {
    localStorage.setItem("branchId", branch._id);
    // dispatch(
    //   setBoardData({
    //     board,
    //   })
    // );
    navigate("/admin-edit-branch");
  };

  const handleListUnlist = (id) => {
    axios
      .put(`admin/branch-list-unlist?id=${id}`, null, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setToastMessage(id, res.data.message);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(id, err.message);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div className="bg-sky-900 flex overflow-x-hidden ">
      <div className="bg-dark-purple ">
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage branches
        </p>
        <div className="flex justify-around">
          {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
  <input type="text" name="" id="" placeholder='search' className='inline-block' />
  <div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
    <FaSearch />
  </div>
</div> */}
          {/* <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search"
              className="mb-2 md:mb-0 md:mr-2 inline-block w-full md:w-auto"
            />
            <div className="bg-sky-900 p-3 text-white rounded-full  flex justify-center">
              <FaSearch />
            </div>
          </div> */}

          <div className="bg-white p-2 rounded-2xl flex">
            <button
              className="font-bold text-sky-900"
              onClick={() => navigate("/admin-add-branch")}
            >
              ADD BRANCH
            </button>
          </div>
        </div>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th onClick={() => sorting("name")} className="p-3 border">
                  Name of Board/University
                </Th>
                <Th
                  onClick={() => sortingBranch("name")}
                  className="p-3 border"
                >
                  Branch
                </Th>
                <Th className="p-3 border text-center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {boards.map((board, index) => (
                <React.Fragment>
                  <Tr key={board._id} className="bg-white uppercase">
                    <Td className="border">{index + 1}</Td>
                    <Td className="border">{board.name}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  {branches
                    .filter((branch) => branch.board === board._id)
                    .map((branch) => (
                      <Tr key={branch._id} className="bg-white uppercase">
                        <Td></Td>
                        <Td></Td>
                        <Td className="border">{branch.name}</Td>
                        <Td className="border flex justify-center">
                          <button
                            onClick={() => handleEdit(branch)}
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                          >
                            EDIT
                          </button>
                          {branch.listed ? (
                            <button
                              className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                              onClick={() => handleListUnlist(branch._id)}
                            >
                              UNLIST
                            </button>
                          ) : (
                            <button
                              className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                              onClick={() => handleListUnlist(branch._id)}
                            >
                              LIST
                            </button>
                          )}
                        </Td>
                      </Tr>
                    ))}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default BranchList;
