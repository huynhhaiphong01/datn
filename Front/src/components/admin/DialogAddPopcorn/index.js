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

function DialogAddPopcorn(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const [values, setValues] = useState(
        {
            ten:"",
            gia: "",
        }
    )
    const [ten, setTen] = useState("")
    const [gia, setGia] = useState("")
    const [image, setImage] = useState("")

    const handleSubmit = (e) => {
        if(ten==="" || gia===""){
            e.preventDefault();
            toast({
            title: 'Warning!',
            description: "Hãy nhập đủ thông tin",
            status: 'warning',
            duration: 2000,
            isClosable: true,
            })
        }
        else if(gia < 1000){
            e.preventDefault();
            toast({
                title: 'Warning!',
                description: "Giá phải nhập lớn hơn 1000 đ",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        }
        else{
        e.preventDefault();
        const Popcorn={'ten':values.ten,
                    'gia': values.gia,
                }
        const formData = new FormData()
        formData.append('ten', ten)
        formData.append('gia', gia)
        formData.append('image', image)
        console.log(Popcorn)

        axios.post('http://localhost:8000/api/addfooddrink',formData,
        {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }
        ).then(res => {
            console.log(res.data)
        }).catch(error=>{
                console.log(error)
        })
        toast({
            title: 'Successfully!',
            description: "Đã thêm "+values.ten+".",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
        props.parentCallback("Update")
        setValues({ten: "", gia: ""})
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
                Thêm bắp nước
                </AlertDialogHeader>

                <AlertDialogBody color='white'>
                <Box >
                    <Center>
                    <Flex mb='20px'>
                    <Text mr='28px'>Tên thực phẩm </Text>
                    <Input w='200px' h='45px' type='text'
                    value={ten}
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập tên thực phẩm' 
                    onChange={(e)=>{
                        setTen(e.target.value)
                        }}
                    />
                    </Flex>
                    </Center>
                    <Center>
                    <Flex mb='20px'>
                    <Text mr='100px'>Giá</Text>
                    <Input w='200px' h='45px' type='number'
                    value={gia}
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập giá' 
                    onChange={(e)=>{
                        setGia(e.target.value)
                        }}
                    />
                    </Flex>
                    </Center>
                    <Center>
                    <Flex mb='20px'>
                    <Text mr='100px'>Ảnh</Text>
                    <Input w='200px' h='45px' type='file'
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Image' 
                    onChange={(e)=>{
                        setImage(e.target.files[0])
                        }}
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



export default DialogAddPopcorn;