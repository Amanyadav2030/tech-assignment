import { Box, Button, HStack, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { authLogoutApi } from '../store/auth/auth.action';
import styles from './Navbar.module.css';
const Navbar = () => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authData)
  return (
    <HStack w={'100%'} justify={'space-around'} fontSize={'1.2rem'} p={['1rem 0.2rem', '1.2rem', '1.5rem', '2rem']}>
      <Box display={['none', 'none', 'flex', 'flex']} fontWeight={'500'}><Text><b>Tech</b>Assignment</Text></Box>
      <HStack className={styles.links} gap={['0.3rem', '0.7rem', '2rem', '2.2rem']}>
        <Link to={'/'}>
          Home
        </Link>
        {
          isAuth ?
            <Button colorScheme={'green'} onClick={() => dispatch(authLogoutApi())} fontSize={'1.1rem'} p={'1.2rem 2rem'} h={'2.3rem'}>Logout</Button> : <>
              <Button colorScheme={'green'} onClick={() => redirect('/login')} fontSize={'1.1rem'} p={'1.2rem 2rem'} h={'2.3rem'}>Login</Button>
              <Button colorScheme={'green'} onClick={() => redirect('/signup')} fontSize={'1.1rem'} p={'1.2rem 2rem'} h={'2.3rem'}>Sign up</Button>
            </>
        }
      </HStack>
    </HStack>
  )
}

export default Navbar