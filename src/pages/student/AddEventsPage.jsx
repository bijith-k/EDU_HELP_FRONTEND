import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense,lazy } from "react";
// import AddEvents from "../../components/Student/Events/AddEvents";
const AddEvents = lazy(() =>
  import("../../components/Student/Events/AddEvents")
);
const AddEventsPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="288px" />
            <Skeleton height="50px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <AddEvents />
         
      </Suspense>
    </>
  );
};

export default AddEventsPage;
