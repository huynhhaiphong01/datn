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
import moment from "moment";
function DialogDeleteShowtime (props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast=useToast()
    const handleSubmit = (e) => {
        
    e.preventDefault();
        
     axios.post(`http://localhost:8000/api/deletesuatchieu/${props.data.id}`).then(res => {
  
        }).catch(error=>{
              console.log(error)
        })
        toast({
          title: 'Successfully!',
          description: "Đã xóa suất chiếu",
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
              Xóa suất chiếu
            </AlertDialogHeader>

            <AlertDialogBody>
              Chắc chắn xóa suất chiếu này khỏi danh sách?<br/>
              - Ngày chiếu: {moment(props.data.date).format("DD/MM/YYYY")}<br/>
              - Thời gian chiếu: {moment(props.data.start,"h:mm:ss").format("LT")} - 
              {moment(props.data.finish,"h:mm:ss").format("LT")}<br/>
              - Phim: {props.data.movie}<br/>
              - Phòng chiếu: {props.data.room}<br/>
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
export default DialogDeleteShowtime