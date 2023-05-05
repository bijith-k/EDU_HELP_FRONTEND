import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const Rejected = lazy(()=>import("../../components/Tutor/RejectedUI/Rejected"))

const ApprovalRejected = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <Rejected />
      </Suspense>
    </>
  );
};

export default ApprovalRejected;
