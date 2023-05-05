import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const StudentSignUp = lazy(()=>import("../../components/Auth/SignUp/StudentSignUp"))

const StudentSignUpPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <StudentSignUp />
      </Suspense>
    </>
  );
};

export default StudentSignUpPage;
