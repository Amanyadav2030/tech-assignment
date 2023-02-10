import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Navbar from '../../components/Navbar';
import { authSignupApi } from '../../store/auth/auth.action';
import { useDispatch } from 'react-redux';
const Signup = () => {
  const redirect = useNavigate();
  const toast = useToast()
  const [info, setInfo] = React.useState({
    name: "",
    email: "",
    password: "",
    contact: ""
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    dispatch(authSignupApi(info)).then((res) => {
      console.log(res.type)
      if (res.type == 'auth/signup/success') {
        toast({
          title: 'Signin successfully',
          status: 'success',
          isClosable: true,
        })
        setTimeout(() => {
          redirect('/login')
        }, 2000);
      }
    }).catch((err) => {
      console.log(err.message)
      toast({
        title: `${err.response.data} ${err.message}`,
        status: 'error',
        isClosable: true,
      })
    })
  }
  return (
    <>
      <Navbar />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Signup
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" name={'name'} onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Contact</FormLabel>
              <Input type="number" name='contact' onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name={'password'} onChange={handleChange} />
                <InputRightElement h={'full'}>
                  <span
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <FaRegEyeSlash style={{ fontSize: '1.5rem', cursor: 'pointer' }} /> : <FaRegEye style={{ fontSize: '1.5rem', cursor: 'pointer' }} />}
                  </span>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'green.400'}
                type={'submit'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={() => redirect('/login')} color={'green.400'} >Login</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  )
}

export default Signup
