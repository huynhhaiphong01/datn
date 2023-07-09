import React, { useState } from 'react';
import {Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Input,
    Text,
    Flex,
    Center,
    Box,
    useToast} from '@chakra-ui/react'
import axios from 'axios';
import {MdOutlineAdd} from 'react-icons/md'

function DialogAddCategory(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const [values, setValues] = useState(
      {
        category: ""
      }
    )

    const handleSubmit = (e) => {
      if(values.category===""){
        e.preventDefault();
        toast({
          title: 'Warning!',
          description: "Hãy nhập thể loại muốn thêm",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else{
      e.preventDefault();
      const theloai = {ten_the_loai: values.category}

    axios.post('http://localhost:8000/api/addtheloais',theloai).then(res => {

      }).catch(error=>{
            console.log(error)
      })
      toast({
        title: 'Successfully!',
        description: "Đã thêm thể loại "+values.category+".",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      props.parentCallback("Update")
      setValues({category: ""})}
    }
    return(
    <>
      {
        (JSON.parse(localStorage.getItem('user-info')).action.includes("AddCategory"))
        ?
        <Button  leftIcon={<MdOutlineAdd/>}  colorScheme='green' size='md'
          shadow='0px 3px 3px 3px #344a3b' onClick={onOpen}>Thêm mới</Button>
        :
        <Button  leftIcon={<MdOutlineAdd/>}  colorScheme='green' size='md'
          shadow='0px 3px 3px 3px #344a3b' disabled onClick={onOpen}>Thêm mới</Button>
      }
       
       <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='md' 
        >
        <AlertDialogOverlay >
          <AlertDialogContent  bgColor='#1F1D36' border='2px' borderColor='#42C2FF'
          alignSelf='center' 
          ><form onSubmit={handleSubmit}>
            <AlertDialogHeader fontSize='2xl' fontWeight='bold'
             color='white' textAlign='center'>
              Thêm thể loại
            </AlertDialogHeader>

            <AlertDialogBody color='white'>
              <Box >
                <Center>
                <Flex mb='20px'>
                  <Text mr='30px'>Thể loại</Text>
                  <Input w='380px' h='45px' type='text'
                  value={values.category}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập tên thể loại' 
                  onChange={(e)=>{setValues({category:e.target.value})}} />
                </Flex>
                </Center>
              </Box>
               
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button type='submit' colorScheme='green'  ml={3}>
                Thêm
              </Button>
            </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
   </>
    )
}



export default DialogAddCategory;