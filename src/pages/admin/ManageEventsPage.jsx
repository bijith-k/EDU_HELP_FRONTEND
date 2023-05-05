import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const ManageEvents = lazy(()=>import("../../components/Admin/Events/ManageEvents"))

const ManageEventsPage = () => {
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
        <ManageEvents />
      </Suspense>
    </>
  );
};

export default ManageEventsPage;
