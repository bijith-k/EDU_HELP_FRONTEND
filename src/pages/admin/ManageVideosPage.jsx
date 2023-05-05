import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const MangageVideos = lazy(()=>import("../../components/Admin/Videos/MangageVideos"))

const ManageVideosPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <MangageVideos />
      </Suspense>
    </>
  );
};

export default ManageVideosPage;
