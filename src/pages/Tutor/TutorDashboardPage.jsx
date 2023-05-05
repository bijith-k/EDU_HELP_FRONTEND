import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const TutorDashboard = lazy(()=>import("../../components/Tutor/Dashboard/TutorDashboard"))

const TutorDashboardPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="288px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <TutorDashboard />
      </Suspense>
    </>
  );
};

export default TutorDashboardPage;
