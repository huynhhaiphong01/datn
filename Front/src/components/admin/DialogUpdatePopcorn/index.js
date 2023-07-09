import React, { useEffect, useRef, useState } from 'react';
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
    useToast,
    Image} from '@chakra-ui/react'
import axios from 'axios';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';

function DialogUpdatePopcorn(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const inputFile = useRef()
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")

    const [values, setValues] = useState(
        {
            ten: props.data.ten,
            gia: props.data.gia,
            image: props.data.image,
        }
        )
    const [ten, setTen] = useState(props.data.ten)
    const [gia, setGia] = useState(props.data.gia)
    const [image, setImage] = useState(props.data.image)

    const reset = () => {
        inputFile.current.value = ""
        setFile("")
        }
    useEffect(()=>{
        console.log(file)
    },[file])
    const imageHandler = (e) => {
        setFile(e.target.files[0])
        const reader = new FileReader()
        reader.onload = () => {
        if(reader.readyState === 2) {
            setPreview(reader.result)
        }
        }
        reader.readAsDataURL(e.target.files[0])
    }

        const handleSubmit = (e) => {
        if(ten==="" || gia===""){
            e.preventDefault();
            toast({
            title: 'Warning!',
            description: "Hãy nhập đầy đủ thông tin",
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
        formData.append('image', file)

        axios.post(`http://localhost:8000/api/updatefooddrink/${props.data.id}`,formData,
        {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }
        )
        .then(res => {
            inputFile.current.value = ""
            setFile("")
        }).catch(error=>{
                console.log(error)
        })
        toast({
            title: 'Successfully!',
            description: "Đã sửa  "+values.ten+".",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
        inputFile.current.value = ""
        setFile("")
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
                Sửa bắp nước
                </AlertDialogHeader>

                <AlertDialogBody color='white'>
                    <Box>
                        <Center>
                            <Flex mb='20px'>
                            <Box>
                                <Text mr='28px'>Tên thực phẩm</Text>
                                <Box>
                                    <Flex>
                                        <Box boxSize="24px" pos="relative" overflow="hidden" cursor="pointer">
                                        <EditIcon as='label' boxSize="24px" pos="absolute" cursor="pointer" color="#42C2FF"/>
                                        <Input boxSize="24px" opacity={0} type='file' id='avatar' pos="absolute"
                                            ref={inputFile}
                                            onChange={imageHandler}
                                        />
                                        </Box>
                                        {
                                            file
                                            ?
                                                <Center>
                                                <Button boxSize="18px" pos="relative" overflow="hidden" color="red.500" colorScheme="none"
                                                    onClick={reset}
                                                >
                                                    <CloseIcon boxSize="24px"/>
                                                </Button>
                                                </Center>
                                            :
                                            ""
                                        }
                                    </Flex>
                                </Box>
                            </Box>
                            {
                                file
                                ?
                                <Image border='2px' borderColor='#42C2FF' borderRadius='20%'
                                    src={preview} boxSize="200px"
                                    marginLeft='0'/>
                                :
                                <Image border='2px' borderColor='#42C2FF' borderRadius='20%'
                                src={"http://localhost:8000/"+ image} boxSize="200px"
                                marginLeft='0'/>
                            }
                                </Flex>
                            </Center>
                        <Box >
                            <Center>
                            <Flex mb='20px'>
                            <Text mr='28px'>Tên thực phẩm</Text>
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
                            <Text mr='110px'>Giá</Text>
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
                        </Box>
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



export default DialogUpdatePopcorn;