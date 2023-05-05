import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const EditPlans = lazy(()=>import("../../components/Admin/Plans/EditPlans"))

const EditPlansPage = () => {
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
        <EditPlans />
      </Suspense>
    </>
  );
};

export default EditPlansPage;
