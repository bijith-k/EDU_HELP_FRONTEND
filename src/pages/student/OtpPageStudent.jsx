import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const OtpStudent = lazy(()=>import("../../components/Auth/SignUp/OtpStudent"))

const OtpPageStudent = () => {
  return(
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <OtpStudent />
      </Suspense>
    </>
    )
};

export default OtpPageStudent;
