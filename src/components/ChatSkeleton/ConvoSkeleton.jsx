import { Box, Skeleton } from '@chakra-ui/react';
import React from 'react'

const ConvoSkeleton = () => {
  return (
    <Box className="">
      <Box
        padding="6"
        boxShadow="lg"
        className="mt-0 mx-auto h-fit w-80 md:w-56 "
      >
        <Skeleton height="25" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        <Skeleton height="30" mt="6" className="mx-auto" />
        
      </Box>
      
    </Box>
  );
}

export default ConvoSkeleton