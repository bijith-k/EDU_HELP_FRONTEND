import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const ManagePlans = lazy(()=>import("../../components/Admin/Plans/ManagePlans"))

const ManagePlansPage = () => {
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
        <ManagePlans />
      </Suspense>
    </>
  );
};

export default ManagePlansPage;
