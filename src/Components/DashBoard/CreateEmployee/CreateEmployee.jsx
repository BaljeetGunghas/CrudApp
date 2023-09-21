
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  InputGroup,
  Stack,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
// import { Toast } from "../../Toast";
import { useToast } from "@chakra-ui/react";

import { useFormik } from "formik";

const CreateEmployee = ({ isOpen, onClose }) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      role: "",
    }, // validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      console.log(JSON.stringify(values, null, 1));
      actions.resetForm();
      // Toast("added", "warning", 2000);
      toast({
        title: "added",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    },
  });

  // create employe function
  // const handlerEmployeeCreate = () => {

  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent mx={"1rem"}>
        <ModalHeader textAlign={"center"}>Create Employee</ModalHeader>
        <ModalCloseButton />
        <Stack
          spacing={4}
          p="1rem"
          backgroundColor="whiteAlpha.900"
          rounded={"10px"}
        >
          <form onSubmit={formik.handleSubmit}>
            <InputGroup gap={5}>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  type={"text"}
                  placeholder="First name"
                  name="firstname"
                  value={formik.values.firstname}
                  // onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  type={"text"}
                  name="lastname"
                  placeholder="Last name"
                  value={formik.values.lastname}
                  // onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </FormControl>
            </InputGroup>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type={"email"}
                name="email"
                placeholder="Email address"
                value={formik.values.email}
                // onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                defaultValue={formik.values.gender}
              >
                <HStack spacing="24px">
                  <Radio
                    name="gender"
                    value="male"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    Male
                  </Radio>
                  <Radio
                    name="gender"
                    value="female"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    Female
                  </Radio>
                  <Radio
                    name="gender"
                    value="other"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    Other
                  </Radio>
                </HStack>
              </RadioGroup>


</FormControl>
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Select role"
                value={formik.values.role}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="role"
              >
                <option>Software Devloper</option>
                <option>Data Entry Operator</option>
                <option>Executive </option>
                <option>Manager </option>
                <option>Operation Exicutive </option>
                <option>Other</option>
              </Select>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="orange"
              width="full"
              mt={5}
              // onClick={handlerEmployeeCreate}
            >
              Create Employee
            </Button>
          </form>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default CreateEmployee;