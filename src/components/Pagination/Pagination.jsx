import { Button } from "@chakra-ui/react";
import React from "react";

const Pagination = ({
  totalContents,
  contentsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalContents / contentsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center my-4">
      {pages.map((page, index) => {
        return (
          <Button
            className={page == currentPage ? "bg-red-200 mr-1" : "mr-1"}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
