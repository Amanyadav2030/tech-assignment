import { Heading, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { FaUserCog } from 'react-icons/fa';
import { MdOutlineContactMail, MdOutlineContactPhone } from 'react-icons/md';
import styles from './Datas.module.css'
import DataCard from './DataCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../../store/data/Data.action';
const ShowData = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((store) => store.authData);
    const { data } = useSelector((store) => store.hydrabadData);
    useEffect(() => {
        dispatch(getDataAPI(token))
    }, [dispatch]);
    console.log(data)
    return (
        <VStack className={styles.table} w={['100%', '100%', '96%', '90%']} >
            <TableContainer w={'100%'} >
                <Table size={['md', 'lg', 'lg']} overflowX={'auto'} >
                    <Thead background={'#2C3539'}>
                        <Tr>
                            <Th >
                                Title
                            </Th>
                            <Th>
                                Description
                            </Th>
                            <Th>
                                Price
                            </Th>
                            <Th>
                                Update
                            </Th>
                            <Th>
                                Delete
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((el) => <DataCard key={el._id} id={el._id} description={el.description} title={el.title} price={el.price} />)}
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
    )
}

export default ShowData;