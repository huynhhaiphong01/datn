import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    useToast,
  } from '@chakra-ui/react'
import axios from "axios";
function DialogDeleteUsers(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast=useToast()
    const handleSubmit = (e) => {
        
    e.preventDefault();
        
     axios.post(`http://localhost:8000/api/deleteuser/${props.idUser}`).then(res => {
  
        }).catch(error=>{
              console.log(error)
        })
        toast({
          title: 'Successfully!',
          description: "Đã xóa tài khoản"+props.username+".",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        props.parentCallback("Update")
      }
    return(
        <>
        {
          (JSON.parse(localStorage.getItem('user-info')).action.includes("DeleteUser"))
          ?
          <Button size='sm' colorScheme='red' onClick={onOpen}>Xóa</Button>
          :
          <Button size='sm' disabled colorScheme='red' onClick={onOpen}>Xóa</Button>
        }
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignSelf='center'>
            <form onSubmit={handleSubmit}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Xóa tài khoản
            </AlertDialogHeader>

            <AlertDialogBody>
              Chắc chắn xóa tài khoản {props.username} khỏi danh sách?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button type='submit' colorScheme='red' onClick={onClose} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
           </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </>
    )
}
export default DialogDeleteUsers