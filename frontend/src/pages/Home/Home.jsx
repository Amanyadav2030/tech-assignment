import { HStack, Text, VStack, Heading, Image, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { GoPlus } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import AddData from './components/AddData';
import ShowData from './components/ShowData';
const Home = () => {
    const [content, setContent] = useState({});
    const [statistics, setStatistics] = useState([]);
    const { isAuth } = useSelector((store) => store.authData)
    useEffect(() => {
        // getContent().then((res) => {
        //     setContent(res.data[0]);
        // })
        // getData().then((res) => {
        //     setStatistics(res.data);
        // })
    }, []);
    if (!isAuth) {
        console.log(isAuth)
        return <Navigate to='/login' />
    }
    return (
        <VStack minH={'100vh'}>
            <Navbar />
            <AddData />
            <ShowData />
        </VStack>
    )
}

export default Home