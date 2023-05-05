import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const AddPlan = lazy(()=>import("../../components/Admin/Plans/AddPlan"))

const AddPlanPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="50px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <AddPlan />
      </Suspense>
    </>
  );
};

export default AddPlanPage;
