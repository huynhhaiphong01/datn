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

function DialogAddRoom(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const [values, setValues] = useState(
      {
        name:"",
        row: "",
        col:""
      }
    )

    const handleSubmit = (e) => {
      if(values.name==="" || values.row==="" || values.col===""){
        e.preventDefault();
        toast({
          title: 'Warning!',
          description: "Hãy nhập đủ thông tin",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else if(values.row < 8 || values.row > 13){
        e.preventDefault();
        toast({
            title: 'Warning!',
            description: "Số hàng phải lớn hơn 7 và nhỏ hơn 14",
            status: 'warning',
            duration: 2000,
            isClosable: true,
          })
      }
      else if(values.col < 10 || values.col > 15){
        e.preventDefault();
        toast({
            title: 'Warning!',
            description: "Số cột phải lớn hơn 9 và nhỏ hơn 16",
            status: 'warning',
            duration: 2000,
            isClosable: true,
          })
      }
      else{
      e.preventDefault();
      const Room={'ten_phong':values.name,
                  'soluong_day': values.row,
                  'soluong_cot': values.col}
      console.log(Room)

    axios.post('http://localhost:8000/api/addphongchieu',Room).then(res => {

      }).catch(error=>{
            console.log(error)
      })
      toast({
        title: 'Successfully!',
        description: "Đã thêm phòng "+values.name+".",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      props.parentCallback("Update")
      setValues({name: "", row: "", col:""})
    }
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
              Thêm phòng chiếu
            </AlertDialogHeader>

            <AlertDialogBody color='white'>
              <Box >
                <Center>
                <Flex mb='20px'>
                  <Text mr='28px'>Tên phòng</Text>
                  <Input w='380px' h='45px' type='text'
                  value={values.name}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập tên phòng' 
                  onChange={(e)=>{setValues({name: e.target.value,
                                             row: values.row,
                                             col:values.col})}} />
                </Flex>
                </Center>
                <Center>
                <Flex mb='20px'>
                  <Text mr='40px'>Số hàng</Text>
                  <Input w='380px' h='45px' type='number'
                  value={values.row}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập số lượng hàng' 
                  onChange={(e)=>{setValues({name: values.name,
                                            row: e.target.value,
                                            col:values.col})}} />
                </Flex>
                </Center>
                <Center>
                <Flex mb='20px'>
                  <Text mr='50px'>Số cột</Text>
                  <Input w='380px' h='45px' type='number'
                  value={values.col}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập số lượng cột' 
                  onChange={(e)=>{setValues({name: values.name,
                                            row: values.row,
                                            col: e.target.value})}} />
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



export default DialogAddRoom;