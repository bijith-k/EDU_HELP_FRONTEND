import { Skeleton, Stack } from '@chakra-ui/react';
import React, { Suspense,lazy } from 'react'
// import Notes from '../../components/Student/Notes/Notes'
const Notes = lazy(()=>import('../../components/Student/Notes/Notes'))

const NotesPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="288px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <Notes />
      </Suspense>
    </>
  );
}

export default NotesPage