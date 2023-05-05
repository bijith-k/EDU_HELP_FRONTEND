import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const Settings = lazy(()=>import("../../components/Tutor/Settings/Settings"))

const TutorSettingsPage = () => {
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
        <Settings />
      </Suspense>
    </>
  );
};

export default TutorSettingsPage;
