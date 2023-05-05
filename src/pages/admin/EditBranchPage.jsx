import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const EditBranch = lazy(()=>import("../../components/Admin/Branch/EditBranch"))

const EditBranchPage = () => {
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
        <EditBranch />
      </Suspense>
    </>
  );
};

export default EditBranchPage;
