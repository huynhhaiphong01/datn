import React, { useEffect, useState } from "react";
import {
    Stack, 
    Box,
    Heading,
    Divider,
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
 
    SimpleGrid,
    Center,
    Image,
    Spacer,
    Button,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputField,
    Text,
} from "@chakra-ui/react"

import { ChevronRightIcon, InfoIcon } from '@chakra-ui/icons'
import {  useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";
import axios from "axios";

const BillInfo = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const [locationState, setLocationState]=useState(
        {data:[], ghe: []})
    const [foodDrink, setFoodDrink]=useState([])
    const [FD_data, setFD_data]=useState()
    React.useEffect(() =>{
        if(location.state){
            let _state=location.state
            setLocationState(_state)
            console.log(_state)
        }
    }, [])

    const handleClick = () => {
        const data = {
            "user_id": JSON.parse(localStorage.getItem('user-info')).id,
            "suatchieu_id": location.state.data.data.id,
            "ghe_id": location.state.ghe,
            "gia_ve": 100000,
            "food_drink": location.state.foodDrink
        }
        console.log(data)
        axios.post('http://localhost:8000/api/addhoadon', data
        ).then(res => {
            navigate("/success")
            console.log(res.data)
        }).catch(error=>{
                console.log(error)
        })
    }
    
    var gia = location.state.ghe.length*100000

    location.state.foodDrink.map(item => {
        if(item.so_luong !== 0){
            gia += (Number(item.so_luong)* item.gia)
        }
    })

    return(
        <Box>
        <Stack minH="640px" color='white' bgColor='#1F1D36' px={164} py={18} fontFamily='Poppins'>
            <Box>
                <Heading fontSize='32px'>Thông tin phim</Heading>
                <Divider size='' mb='24px'/>
                <Breadcrumb spacing='8px' separator={<Heading><ChevronRightIcon /></Heading>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>{locationState.data.tenphim}</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>MUA VÉ</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>CHỌN LỊCH CHIẾU</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>CHỌN GHẾ</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>CHI TIẾT HÓA ĐƠN</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box>
                    <Divider mt='10px' mb='24px'/>
                    <Flex>
                        <Spacer/>
                        <Box w='100%'>
                            <Box borderRadius='0px' bgColor="white" boxShadow="4px 6px 5px 0px rgb(255 255 255 / 0.4)" w='100%' overflow="hidden">
                                <Flex>
                                    <Box w="40%" fontSize="24px" color="blackAlpha.400" borderRight="1px">
                                        <Image w="100%" objectFit="cover" h='100%' src={"http://localhost:8000/" + location.state.data.data.poster}/>
                                    </Box>
                                    <Box w="60%" fontSize="24px" color="blackAlpha.400" pb='20px'>
                                        <Box px="25px" py="15px">
                                            <Flex alignItems="center">
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='50px'
                                                    src={require('../../../imgs/BillLogo.png')}
                                                    alt='Logo'
                                                ></Image>
                                                <Box>
                                                    <Heading ml="10px" fontSize="30px" bgGradient='linear(to-r, #7928CA, #FF0080)'
                                                                bgClip='text'>CPM</Heading>
                                                    <Text color="gray" fontSize="12px">CINEMA PRO MAX</Text>
                                                </Box>
                                                <Spacer/>
                                                <Heading mr="5px" fontSize="24px">PAYMENT INFO</Heading>
                                                <InfoIcon/>
                                            </Flex>
                                            <Divider mt="10px"/>
                                            <Flex>
                                                <Box>
                                                    <Heading bgGradient='linear(to-r, #7928CA, #FF0080)'
                                                                bgClip='text'>
                                                        CINEMA PRO MAX
                                                    </Heading>
                                                    <Text mt="10px"  color="gray" fontWeight="bold">
                                                        PHIM: {location.state.data.tenphim} 
                                                    </Text>
                                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                        Số lượng: {location.state.ghe.length} VÉ
                                                    </Text>
                                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                        Phòng chiếu: {location.state.data.data.phongchieu_name}
                                                    </Text>
                                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                        Ngày chiếu: {moment(location.state.data.data.ngay_chieu).format("DD/MM/YYYY")}
                                                    </Text>
                                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                        Khung giờ: {moment(location.state.data.data.gio_bat_dau, "h:mm:ss").format("LT")} - {moment(location.state.data.data.gio_ket_thuc, "h:mm:ss").format("LT")}
                                                    </Text>
                                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                        Ghế: {location.state.seatCode.join(", ")}
                                                    </Text>
                                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                        {/* Đồ ăn: 2 x Bắp lớn, 2 x Coca-cola lớn */}
                                                        Đồ ăn: {location.state.foodDrink.map(item => {
                                                            if(item.so_luong !== 0){
                                                                return(
                                                                    item.so_luong+ "x"+ item.food_drink_name+", "
                                                                )
                                                            }
                                                            
                                                        })}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Divider mt="10px"/>
                                            <Flex>
                                                <Box>
                                                    <Heading color="gray">
                                                        Thông tin người mua
                                                    </Heading>
                                                    <Flex>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            Tên tài khoản:
                                                        </Text>
                                                        <Spacer/>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            {JSON.parse(localStorage.getItem('user-info')).name}
                                                        </Text>
                                                    </Flex>
                                                    <Flex>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            Tên khách hàng:
                                                        </Text>
                                                        <Spacer/>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            {JSON.parse(localStorage.getItem('user-info')).realname}
                                                        </Text>
                                                    </Flex>
                                                    <Flex>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            Email:
                                                        </Text>
                                                        <Spacer/>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            {JSON.parse(localStorage.getItem('user-info')).email}
                                                        </Text>
                                                    </Flex>
                                                    <Flex>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            Ngày giao dịch:
                                                        </Text>
                                                        <Spacer/>
                                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                                            {moment(Date.now()).format("DD/ MM/ YYYY")}
                                                        </Text>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                            <Divider mt="20px"/>
                                            <Heading color="gray">
                                                Tổng cộng: {gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")} đ
                                            </Heading>
                                            <Divider mt="20px"/>
                                        </Box>
                                        <Center>
                                            <Button fontSize="24px" color="white" colorScheme="purple" mt="20px" w="300px" h="100px"
                                            onClick={handleClick}
                                            > MUA NGAY</Button>
                                        </Center>
                                    </Box>
                                </Flex>
                            </Box>
                            

                            <Center mt="30px">
                            <Button 
                                onClick={()=>navigate(-1)}
                                colorScheme='red'
                                color='white'
                                size='lg'
                                borderRadius="10px"
                                w="80px"
                                h="40px"
                                mr ="50px"
                            >Back
                            </Button>
            
                            </Center>
                        </Box>
                        <Spacer/>
                    </Flex>
                </Box>
            </Box>
            
        </Stack>
        </Box>
    )
}

export default BillInfo