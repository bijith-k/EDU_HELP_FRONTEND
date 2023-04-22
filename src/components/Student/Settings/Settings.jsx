import React from 'react'
import Navbar from '../Home/Navbar';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const Settings = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="h-screen w-full pt-16  overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          HAPPY LEARNING BIJITH
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          SETTINGS
        </h1>
      </div>
      <div className="mt-5 w-2/3 mx-auto">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter current password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <InputGroup size="md" className="mt-5">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter new password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          // isLoading
          loadingText="Updating"
          colorScheme="teal"
          variant="solid"
          className="mt-5"
        >
          UPDATE PASSWORD
        </Button>
      </div>

      {/* <hr className="my-10 mx-5" />
      <div className="mt-5 w-2/3 mx-auto">

      </div> */}
    </div>
  );
}

export default Settings