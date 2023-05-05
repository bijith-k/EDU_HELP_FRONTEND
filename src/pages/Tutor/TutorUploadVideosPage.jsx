import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const TutorUploadVideos = lazy(() =>
  import("../../components/Tutor/UploadContents/TutorUploadVideos")
);

const TutorUploadVideosPage = () => {
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
        <TutorUploadVideos />
      </Suspense>
    </>
  );
};

export default TutorUploadVideosPage;
