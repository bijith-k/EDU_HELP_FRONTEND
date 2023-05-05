import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const StudentLogin = lazy(()=>import("../../components/Auth/Login/StudentLogin"))

function StudentLoginPage() {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        
        <StudentLogin />
      </Suspense>
    </>
  );
}

export default StudentLoginPage;
