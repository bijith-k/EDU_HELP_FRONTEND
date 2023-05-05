import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const BoardList = lazy(()=>import("../../components/Admin/Board/BoardList"))

const BoardListPage = () => {
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
        <BoardList />
      </Suspense>
    </>
  );
};

export default BoardListPage;
