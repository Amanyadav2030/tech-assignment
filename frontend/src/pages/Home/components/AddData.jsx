import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDataAPI } from '../../../store/data/Data.action';
const AddData = () => {
    const toast = useToast();
    const redirect = useNavigate();
    const { token } = useSelector((store) => store.authData)
    const dispatch = useDispatch()
    const [content, setContent] = useState({
        title: "",
        description: "",
        price: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent({
            ...content,
            [name]: value
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(content)
        dispatch(addDataAPI(token, content)).then((res) => {
            console.log(res.type)
            if (res.type == 'add/DATA/success') {
                toast({
                    title: 'Data added successfully',
                    status: 'success',
                    isClosable: true,
                });
                setContent({
                    title: "",
                    description: "",
                    price: "",
                })
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
        <HStack
            pt={'3rem'}
            align={'start'}
            w={'100%'}
            minH={'70vh'}
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
            >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Add Data
                </Heading>
                <form onSubmit={handleSubmit} >
                    <Stack w={'100%'} spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={content.title}
                                name='title'
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                name='description'
                                onChange={handleChange}
                                value={content.description}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Price</FormLabel>
                            <Input
                                _placeholder={{ color: 'gray.500' }}
                                type="number"
                                name='price'
                                value={content.price}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                type={'submit'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Add
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </HStack>
    )
}

export default AddData