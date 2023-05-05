import React, { Suspense } from 'react'
import { Skeleton, Stack } from "@chakra-ui/react";

// import Home from '../../components/Student/Home/Home'
import Navbar from '../../components/Student/Home/Navbar'
import { ErrorBoundary } from 'react-error-boundary'
const Home = React.lazy(()=> import('../../components/Student/Home/Home'))
import ErrorFallback from '../student/ErrorBoundary'
import Footer from '../../components/Student/Footer/Footer';

const HomePage = () => {
   
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="288px" />
            <Skeleton height="224px" />
            <Skeleton height="224px" />
            <Skeleton height="224px" />
            <Skeleton height="160px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <Navbar />

        <Home />
        {/* <Footer /> */}
      </Suspense>
    </>
  );
}

export default HomePage