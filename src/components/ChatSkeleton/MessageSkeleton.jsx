import { Box, Skeleton, Spinner } from '@chakra-ui/react';
import React from 'react'

const MessageSkeleton = () => {
  return (
    <Box className="flex justify-center ">
       
      <Box
        padding={"2"}
        className="h-80 w-full  "
      >
        <Skeleton height="full" >
           
        </Skeleton>
      </Box>
    </Box>
  );
}

export default MessageSkeleton