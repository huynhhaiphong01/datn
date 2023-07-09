import React, { useEffect, useState } from 'react';
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
import Multiselect from 'multiselect-react-dropdown';
import {MdOutlineAdd} from 'react-icons/md'

function DialogAddShowtime(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const [Movie,setMovie] = useState([])
    const [Room, setRoom] =useState([])
    const [values, setValues] = useState(
      {
        date:"",
        start: "",
        finish:""
      }
    )
    useEffect(()=>{
      },[Movie])
    const SelectMovie = val => {
        setMovie(val)
      }
    useEffect(()=>{
    },[Room])
    const SelectRoom = val => {
    setRoom(val)
    }
    const handleSubmit = (e) => {
      if(values.date==="" || values.start==="" || values.finish==="" ||!Movie.length
      || !Room.length){
        e.preventDefault();
        toast({
          title: 'Warning!',
          description: "Hãy nhập đủ thông tin",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else if(Date.parse(values.date)<Date.now()){
        e.preventDefault();
        toast({
          title: 'Warning!',
          description: "Ngày chiếu không hợp lệ",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else{
      e.preventDefault();
      const Showtime={
          ngay_chieu: values.date,
          gio_bat_dau: values.start,
          gio_ket_thuc: values.finish,
          phim_id: Movie[0].id_movie,
          phongchieu_id: Room[0].id_room
      }

    axios.post('http://localhost:8000/api/addsuatchieu',Showtime).then(res => {
        toast({
            title: 'Successfully!',
            description: "Đã thêm suất chiếu.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          props.parentCallback("Update")
          setValues({date: "", start: "", finish:""})

      }).catch(error=>{
            console.log(error)
            toast({
                title: 'Error!',
                description: "Suất chiếu bị trùng.",
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
      })
    }
    }
    return(
    <>
      {
        (JSON.parse(localStorage.getItem('user-info')).action.includes("AddCategory"))
        ?
        <Button colorScheme='green' size='md' leftIcon={<MdOutlineAdd/>} 
          shadow='0px 3px 3px 3px #344a3b' onClick={onOpen}>Thêm mới</Button>
        :
        <Button  colorScheme='green' size='md' leftIcon={<MdOutlineAdd/>} 
          shadow='0px 3px 3px 3px #344a3b' disabled onClick={onOpen}>Thêm mới</Button>
      }
       
       <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='lg' 
        >
        <AlertDialogOverlay >
          <AlertDialogContent  bgColor='#1F1D36' border='2px' borderColor='#42C2FF'
          alignSelf='center' 
          ><form onSubmit={handleSubmit}>
            <AlertDialogHeader fontSize='2xl' fontWeight='bold'
             color='white' textAlign='center'>
              Thêm suất chiếu
            </AlertDialogHeader>

            <AlertDialogBody color='white'>
              <Box >
               <Center>
                <Flex mb='20px'>
                  <Text mr='45px'>Ngày chiếu</Text>
                  <Input w='400px' h='45px' type='date'
                  value={values.date}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập số lượng cột' 
                  onChange={(e)=>{setValues({start: values.start,
                                            finish: values.finish,
                                            date: e.target.value})}} />
                </Flex>
                </Center>
                <Center>
                <Flex mb='20px'>
                  <Text mr='40px'>Giờ bắt đầu</Text>
                  <Input w='400px' h='45px' type='time'
                  value={values.start}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập giờ bắt đầu' 
                  onChange={(e)=>{setValues({start: e.target.value,
                                             date: values.date,
                                             finish:values.finish})}} />
                </Flex>
                </Center>
                <Center>
                <Flex mb='20px'>
                  <Text mr='38px'>Giờ kết thúc</Text>
                  <Input w='400px' h='45px' type='time'
                  value={values.finish}
                  focusBorderColor='white'
                  border='2px'
                  borderRadius='10px'
                  borderColor='#42C2FF'
                  placeholder='Nhập giờ kết thúc' 
                  onChange={(e)=>{setValues({date: values.date,
                                            finish: e.target.value,
                                            start:values.start})}} />
                </Flex>
                </Center>
               
               <Center>
                <Flex mb='20px'>
                   <Text mr='80px'>Phim</Text>
                    <Multiselect className='mse-showtime'
                    singleSelect
                    placeholder='Chọn phim' hidePlaceholder='true'
                    options={props.listMovie} showCheckbox='true' displayValue="movie"
                    onSelect={SelectMovie}
                    onRemove={SelectMovie}
                    avoidHighlightFirstOption='true'
                    style={ {chips: { background: "#42C2FF" },
                    searchBox: {color:"white", border: "2px solid #42C2FF",  "borderRadius": "10px",
                   height: "45px"}} }
                    />
                </Flex>
               </Center>

               <Center>
                <Flex mb='20px'>
                   <Text mr='35px'>Phòng chiếu</Text>
                    <Multiselect className='mse-showtime'
                    singleSelect
                    placeholder='Chọn phòng chiếu' hidePlaceholder='true'
                    options={props.listRoom} showCheckbox='true' displayValue="room"
                    onSelect={SelectRoom}
                    onRemove={SelectRoom}
                    avoidHighlightFirstOption='true'
                    style={ {chips: { background: "#42C2FF" },
                    searchBox: {color:"white", border: "2px solid #42C2FF",  "borderRadius": "10px",
                    height: "45px"}} }
                    />
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



export default DialogAddShowtime;