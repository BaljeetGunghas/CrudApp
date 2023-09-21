import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
  Text,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {
  AiFillDashboard,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLogin,
} from "react-icons/ai";
import Signup from "./Signup";
import { useFormik } from "formik";
import axios from "axios";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({ verifyUser, setVerifyUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSignup, setloginSignup] = useState(true);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowPassword(false);
    }, 1000);
  }, [showPassword]);

  useEffect(() => {
    if (verifyUser) {
      navigate("/dashboard");
    }
  }, [verifyUser]);

  // To show Password
  const handleShowClick = () => setShowPassword(!showPassword);

  //Submit Handler
  // const handleSubmit = () => {
  //   if (!userEmail || !userEmail.includes("@royalmatrimonial.com")) {
  //     return toast({
  //       title: `Email Not Valid`,
  //       status: "error",
  //       isClosable: true,
  //       position: "top",
  //       duration: 3000,
  //     });
  //   } else if (userPassword.length <= 3) {
  //     return toast({
  //       title: "Password is Too short",
  //       status: "error",
  //       isClosable: true,
  //       position: "top",
  //       duration: 3000,
  //     });
  //   } else {
  //     setVerifyUser(true);
  //     return toast({
  //       title: "Login Successfully",
  //       status: "success",
  //       isClosable: true,
  //       position: "top",
  //       duration: 1000,
  //     });
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: validate,
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .post("http://localhost:8080/login", values)
        .then(function (response) {
          setLoading(false);

          if (response.data.success) {
            localStorage.setItem("loginuser", JSON.stringify(response.data));

            const token = "yes"; // Replace with your actual authentication token

            document.cookie = `auth_token=${token}; expires=${new Date(
              new Date().getTime() + 60000
            ).toUTCString()}`;

            setVerifyUser(true);
            return toast({
              title: "Login Successfully",
              status: "success",
              isClosable: true,
              position: "top",
              duration: 1000,
            });
          } else {
            setVerifyUser(false);
            return toast({
              title: "No user Find !!",
              status: "error",
              isClosable: true,
              position: "top",
              duration: 1000,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          return toast({
            title: error?.response?.data?.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 1000,
          });
        });
    },
  });

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        {loginSignup ? (
          <Box width={{ base: "90%", md: "368px" }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded={"10px"}
              >
                <FormControl>
                  <InputGroup>
                    <Select
                      variant="outline"
                      placeholder="Login As"
                      paddingLeft={"0"}
                      color={"gray.500"}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Select>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formik.values.email}
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        backgroundColor="whiteAlpha.900"
                        size="sm"
                        onClick={handleShowClick}
                      >
                        {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  {loading && <Spinner size="xs" mr={2} />}
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        ) : (
          <Signup setloginSignup={setloginSignup} />
        )}
      </Stack>
      {loginSignup ? (
        <Box>
          New to us?{" "}
          <Text
            color="teal.500"
            display={"inline"}
            cursor={"pointer"}
            onClick={() => setloginSignup(!loginSignup)}
          >
            Sign Up
          </Text>
        </Box>
      ) : (
        <Box>
          Already have an account?
          <Text
            color="teal.500"
            display={"inline"}
            cursor={"pointer"}
            onClick={() => setloginSignup(!loginSignup)}
          >
            Login
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default Login;
