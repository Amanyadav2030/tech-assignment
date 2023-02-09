import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from './Datas.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDataAPI, updateDataAPI } from '../../../store/data/Data.action';
const DataCard = ({ title, description, price, id }) => {
  const [editable, setEditable] = useState(true);
  const toast = useToast();
  const { token } = useSelector((store) => store.authData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch()
  const [data, setData] = useState({
    title,
    description,
    price
  })
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };
  const handleDelete = (e) => {
    dispatch(deleteDataAPI(token, id)).then((res) => {
      console.log(res.type)
      if (res.type == 'delete/DATA/success') {
        toast({
          title: 'Data Deleted successfully',
          status: 'success',
          isClosable: true,
        });
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
  const handleSubmit = () => {
    // dispatch()
    dispatch(updateDataAPI(token, id, data)).then((res) => {
      console.log(res.type)
      if (res.type == 'update/DATA/success') {
        toast({
          title: 'Data updated successfully',
          status: 'success',
          isClosable: true,
        });
      }
    }).catch((err) => {
      console.log(err.message)
      toast({
        title: `${err.response.data} ${err.message}`,
        status: 'error',
        isClosable: true,
      })
    })
    onClose();
  };
  return (
    <>
      <Tr className={styles.container}>
        <Td >
          {title}
        </Td>
        <Td >
          {description}
        </Td>
        <Td>
          {price}
        </Td>
        <Td >

          <BiEdit style={{
            fontSize: "1.25rem",
            cursor: 'pointer'
          }}
            onClick={onOpen}
          />

        </Td>
        <Td onClick={handleDelete}>
          <AiOutlineDelete style={{
            fontSize: "1.25rem",
            color: 'red',
            cursor: 'pointer'
          }} />
        </Td>
      </Tr>
      <Modal
        isOpen={isOpen}
        size={['sm', 'md', 'lg']}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={data.title}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={data.description}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input placeholder="price" name="price"
                onChange={handleChange}
                value={data.price}
              />
            </FormControl>
            <FormControl
              mt={4}
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" width={"100%"} onClick={handleSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DataCard