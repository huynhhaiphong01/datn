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
function DialogDeleteRoom (props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast=useToast()
    const handleSubmit = (e) => {
        
    e.preventDefault();
        
     axios.post(`http://localhost:8000/api/deletephongchieu/${props.data.id}`).then(res => {
  
        }).catch(error=>{
              console.log(error)
        })
        toast({
          title: 'Successfully!',
          description: "Đã xóa phòng "+props.data.name+".",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        props.parentCallback("Update")
      }
    return(
        <>
        {
          (JSON.parse(localStorage.getItem('user-info')).action.includes("DeleteCategory"))
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
              Xóa phòng chiếu
            </AlertDialogHeader>

            <AlertDialogBody>
              Chắc chắn xóa phòng {props.data.name} khỏi danh sách?
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
export default DialogDeleteRoom