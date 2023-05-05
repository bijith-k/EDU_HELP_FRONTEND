import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const OtpTutor = lazy(() => import("../../components/Auth/SignUp/OtpTutor"));

const OtpPageTutor = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <OtpTutor />
      </Suspense>
    </>
  );
};

export default OtpPageTutor;
