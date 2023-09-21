import { useToast } from "@chakra-ui/react";

export const Toast =({Title, Status, Duration}) => {
  const toast = useToast();
  return toast({
    title: { Title },
    status: { Status },
    isClosable: true,
    position: "top",
    duration: { Duration },
  });
};