import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const AdminLogin = lazy(()=>import("../../components/Auth/Login/AdminLogin"))

const AdminLoginPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <AdminLogin />
      </Suspense>
    </>
  );
};

export default AdminLoginPage;
