import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  FormHelperText,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import axios from "axios";
const Signup = ({ setloginSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  }, [showPassword]);

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const validate = Yup.object({
    name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    phoneNo: Yup.string()
      .max(10, "Must be 10 characters")
      .min(10, "Must be 10 characters")
      .required("Required"),
    password: Yup.string()
      .matches(passwordRules, {
        message:
          "Password should contain atleast one Uppercase,Lowercase,Number , SpacilChracter",
      })
      .max(12, "Must be 12 characters or less")
      .min(4, "Must be 4 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phoneNo: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .post("http://localhost:8080/register/create", values)
        .then(function (response) {
          setloginSignup(true);
          setLoading(false);
          return toast({
            title: "User Create successfully",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 1000,
          });
        })
        .catch(function (error) {
          const errMsg = error.response.data.msg;
          console.log(errMsg);
          setLoading(false);
          return toast({
            title: errMsg || "User not Regestered try again",
            status: "warning",
            isClosable: true,
            position: "top",
            duration: 1000,
          });
        });
    },
  });

  return (
    <Box width={{ base: "90%", md: "368px" }}>
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        rounded={"10px"}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} p="1rem">
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="First name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <FormHelperText color={"red.400"}>
                  {formik.errors.name}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText color={"red.400"}>
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone No</FormLabel>
              <Input
                placeholder="Mobile Number"
                type="number"
                maxLength={10}
                minLength={10}
                name="phoneNo"
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <FormHelperText color={"red.400"}>
                  {formik.errors.phoneNo}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="Password"
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText color={"red.400"}>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              mt={5}
              display={"flex"}
              alignItems={"center"}
              isDisabled={!(formik.isValid && formik.dirty)}
            >
              {loading && <Spinner size="xs" mr={2} />}
              Regester
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default Signup;
