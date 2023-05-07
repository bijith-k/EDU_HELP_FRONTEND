import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react'

const ChatSkeleton = () => {
  return (
    <Box className="flex md:flex-row flex-col gap-2">
      <Box
        padding="6"
        boxShadow="lg"
        
        className="mt-0 mx-auto h-96 md:w-2/12 w-80 "
      >
        <Skeleton height="25" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
      </Box>
      <Box
        padding="6"
        boxShadow="lg"
        className="mt-0 mx-auto h-40 md:h-96 md:w-10/12 w-80  "
      >
        <Skeleton height="full" className="mx-auto" />
      </Box>
    </Box>
  );
}

export default ChatSkeleton