import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const ManageNotes = lazy(()=>import("../../components/Admin/Notes/ManageNotes"))

const MangageNotesPage = () => {
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
        <ManageNotes />
      </Suspense>
    </>
  );
};

export default MangageNotesPage;
