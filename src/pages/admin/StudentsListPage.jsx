import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const StudentsList = lazy(()=>import("../../components/Admin/StudentsList/StudentsList"))

const StudentsListPage = () => {
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
        <StudentsList />
      </Suspense>
    </>
  );
};

export default StudentsListPage;
