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

function DialogUpdateRoom(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const [values, setValues] = useState(
      {
        name: props.data.name
      }
    )

    const handleSubmit = (e) => {
      if(values.name===""){
        e.preventDefault();
        toast({
          title: 'Warning!',
          description: "Hãy nhập tên phòng",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else{
      e.preventDefault();
      

    axios.put(`http://localhost:8000/api/updateroom/${props.data.id}`,{"ten_phong":values.name}).then(res => {

      }).catch(error=>{
            console.log(error)
      })
      toast({
        title: 'Successfully!',
        description: "Đã sửa phòng "+values.name+".",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      props.parentCallback("Update")
      }
    }
    return(
    <>
      {
        (JSON.parse(localStorage.getItem('user-info')).action.includes("EditCategory"))
        ?
        <Button mr='5px' size='sm' colorScheme='blue' onClick={onOpen}>Sửa</Button>
        :
        <Button mr='5px' size='sm' disabled colorScheme='blue' onClick={onOpen}>Sửa</Button>
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
              Sửa phòng chiếu
            </AlertDialogHeader>

            <AlertDialogBody color='white'>
              <Box >
                <Center>
                <Flex mb='20px'>
                  <Text mr='30px'>Tên phòng</Text>
                  <Input w='380px' h='45px' type='text'
                  value={values.name}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập tên phòng chiếu' 
                  onChange={(e)=>{setValues({name:e.target.value})}} />
                </Flex>
                </Center>
              </Box>
               
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button type='submit' colorScheme='green'  ml={3} onClick={onClose}>
                Sửa
              </Button>
            </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
   </>
    )
}



export default DialogUpdateRoom;