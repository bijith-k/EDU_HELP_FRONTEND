import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const Pending = lazy(()=>import("../../components/Tutor/PendingUI/Pending"))

const ApprovalPending = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <Pending />
      </Suspense>
    </>
  );
};

export default ApprovalPending;
