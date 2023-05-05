import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const TutorLogin = lazy(()=>import("../../components/Auth/Login/TutorLogin"))

const TutorLoginPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <TutorLogin />
      </Suspense>
    </>
  );
};

export default TutorLoginPage;
