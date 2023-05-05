import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const TutorsList = lazy(()=>import("../../components/Admin/TutorsList/TutorsList"))

const TutorsListPage = () => {
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
        <TutorsList />
      </Suspense>
    </>
  );
};

export default TutorsListPage;
