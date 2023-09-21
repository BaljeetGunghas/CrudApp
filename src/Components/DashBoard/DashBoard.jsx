
import { Button } from "@chakra-ui/react";
import { Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



import CreateEmployee from "./CreateEmployee/CreateEmployee";

const DashBoard = ({ verifyUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!verifyUser) {
      navigate("/");
    }
  }, []);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
    <>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading>Welcome to Dashboard</Heading>
      
        
<Button 
          colorScheme="teal"
          variant="ghost"
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
          onClick={onOpen}>
        
          create employee
        </Button>

        
        <CreateEmployee isOpen={isOpen} onClose={onClose} />
        <CreateEmployee isOpen={isOpen} onClose={onClose} />
      </Stack>
      </>
    </Flex>
    
  );
};

export default DashBoard;