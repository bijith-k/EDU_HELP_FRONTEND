import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const BranchList = lazy(()=>import("../../components/Admin/Branch/BranchList"))

const BranchListPage = () => {
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
        <BranchList />
      </Suspense>
    </>
  );
};

export default BranchListPage;
