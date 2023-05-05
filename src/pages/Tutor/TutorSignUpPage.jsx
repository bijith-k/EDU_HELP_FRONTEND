import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const TutorSignUp = lazy(() =>
  import("../../components/Auth/SignUp/TutorSignUp")
);

const TutorSignUpPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <TutorSignUp />
      </Suspense>
    </>
  );
};

export default TutorSignUpPage;
