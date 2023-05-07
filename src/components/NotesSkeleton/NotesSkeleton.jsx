import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react'

const NotesSkeleton = () => {
  return (
    <Box className="flex flex-col md:flex-row gap-2 mt-24">
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        className="mt-5 mx-auto h-96 md:w-3/12 w-80 "
      >
        <Skeleton height="28" mt="6" className="mx-auto" />
        <SkeletonText mt="10" noOfLines={2} spacing="4" skeletonHeight="2" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        <Skeleton height="7" mt="6" className="mx-auto" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        className="mt-5 mx-auto h-96 md:w-3/12 w-80 md:block hidden "
      >
        <Skeleton height="28" mt="6" className="mx-auto" />
        <SkeletonText mt="10" noOfLines={2} spacing="4" skeletonHeight="2" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        <Skeleton height="7" mt="6" className="mx-auto" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        className="mt-5 mx-auto h-96 md:w-3/12 w-80 md:block hidden "
      >
        <Skeleton height="28" mt="6" className="mx-auto" />
        <SkeletonText mt="10" noOfLines={2} spacing="4" skeletonHeight="2" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        <Skeleton height="7" mt="6" className="mx-auto" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        className="mt-5 mx-auto md:block hidden h-96 md:w-3/12 w-80 "
      >
        <Skeleton height="28" mt="6" className="mx-auto" />
        <SkeletonText mt="10" noOfLines={2} spacing="4" skeletonHeight="2" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        <Skeleton height="7" mt="6" className="mx-auto" />
      </Box>
    </Box>
  );
}

export default NotesSkeleton