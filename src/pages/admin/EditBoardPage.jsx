import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const EditBoard = lazy(()=>import("../../components/Admin/Board/EditBoard"))

const EditBoardPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <EditBoard />
      </Suspense>
    </>
  );
};

export default EditBoardPage;
