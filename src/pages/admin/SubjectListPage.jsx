import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const SubjectList = lazy(()=>import("../../components/Admin/Subject/SubjectList"))

const SubjectListPage = () => {
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
        <SubjectList />
      </Suspense>
    </>
  );
};

export default SubjectListPage;
