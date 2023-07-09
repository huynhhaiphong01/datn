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
} from "@chakra-ui/react"

import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";
import axios from "axios";

const FoodDrinkList = () => {
    const location=useLocation()
    const navigate= useNavigate()
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
    useEffect(()=>{
        axios.get('http://localhost:8000/api/food_drinks').
            then(
                res => {
                    setFoodDrink(res.data.data)
                    setFD_data(res.data.data.map((item)=>{
                        return(
                            {
                                "food_drink_name": item.ten,
                                "food_drink_id": item.id,
                                "gia": item.gia,
                                "so_luong": 0
                            }
                        )
                    }))
                }
            ).catch(error => console.log(error))
        },[])
    console.log(FD_data)
    console.log(foodDrink)
    const List = foodDrink.map((item)=>{
            return(
                <Stack>
                    <Flex>
                        <Box>
                            <Image border="2px" borderRadius="50%" src={"http://localhost:8000/"+item.image} boxSize="100px" />
                        </Box>
                        <Box ml="10px">
                            <Box fontSize='24px'>
                                {item.ten}
                                <Box fontSize='24px'>
                                    {item.gia} Đ
                                </Box>
                            </Box>
                            <NumberInput size='xs' maxW={16} min={0} 
                                onChange={(e)=>{
                                    setFD_data(prevState => {
                                        return prevState.map(prev => {
                                            if(prev.food_drink_id === item.id){
                                                prev.so_luong = e
                                            }
                                            return prev
                                        })
                                    })
                                    console.log(FD_data)
                                    }} 
                                defaultValue={0}>
                                <NumberInputField  />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                    </Flex>
                </Stack>
            )
    })

    const handleClick = () => {
        const data = {
            "user_id": JSON.parse(localStorage.getItem('user-info')).id,
            "suatchieu_id": location.state.data.data.id,
            "ghe_id": location.state.ghe,
            "gia_ve": 100000,
            "food_drink": FD_data
        }
        console.log(data)
        axios.post('http://localhost:8000/api/addhoadon', data
        ).then(res => {
            console.log(res.data)
        }).catch(error=>{
                console.log(error)
        })
    }
    
    return(
        <Box>
        <Stack minH="640px" color='white' bgColor='#1F1D36' px={164} py={18} fontFamily='Poppins'>
            <Box>
                <Heading fontSize='32px'>Thông tin phim</Heading>
                <Divider size='' mb='24px'/>
                <Breadcrumb spacing='8px' separator={<Heading><ChevronRightIcon /></Heading>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink><Heading fontSize='32px'>{locationState.data.tenphim}</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink><Heading fontSize='32px'>MUA VÉ</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink><Heading fontSize='32px'>CHỌN LỊCH CHIẾU</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink><Heading fontSize='32px'>CHỌN GHẾ</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
             
                    <Divider  mt='10px' mb='24px'/>
                    <Flex h="100%">
                        <Stack spacing='24px'>
                        <Center borderRadius='10px' border='4px' w='255px' p='10px'>
                                    <Box>
                                        <Heading textAlign='center' fontSize='36px'>
                                            {location.state.data.data.phongchieu_name}
                                        </Heading>
                                    </Box>
                            </Center>
                            <Center borderRadius='10px' border='4px' w='255px'  p='15px'>
                                
                                <Box>
                                    <Heading textAlign='center' fontSize='36px'>
                                        {moment(location.state.data.data.ngay_chieu).format("ddd DD/MM/YYYY")}
                                    </Heading>
                                </Box>
                                  
                            </Center>
                            <Center borderRadius='10px' border='4px' w='255px' h='62' p='10px'>
                                    <Flex>
                                        <Box>
                                            <Heading fontSize='22px' textAlign='center'>
                                                {moment(location.state.data.data.gio_bat_dau,'h:mm:ss').format("LT")} - {moment(location.state.data.data.gio_ket_thuc,'h:mm:ss').format("LT")}
                                            </Heading>
                                        </Box>
                                    </Flex>
                            </Center>
                            <Box borderRadius='10px' border='4px' w='255px'>
                                <Heading fontSize='25px' textAlign='center' m='5px'>
                                    Ghế chọn
                                </Heading><hr/><hr/><hr/>
                                <Heading fontSize='20px' m='8px' textAlign='center'>
                                    {location.state.seatCode.join(", ")}
                                </Heading>
                            </Box>

                            <Center mt="60px">
                            <Button 
                                colorScheme='red'
                                color='white'
                                size='lg'
                                borderRadius="8px"
                                w="80px"
                                h="40px"
                                mr ="50px"
                                onClick={() => navigate(-1)}
                            >Back
                            </Button>
                            
                            <Link to="/home/movie-info/lich-chieu/chon-ghe/chon-food-drink/detail-bill" state={{data:location.state.data, ghe: location.state.ghe, seatCode: location.state.seatCode, foodDrink: FD_data}}>
                                 <Button 
                                     colorScheme='blue'
                                     color='white'
                                     size='lg'
                                     borderRadius="8px"
                                     w="80px"
                                     h="40px"
                                 >Next
                                 </Button>
                             </Link>
                
                            </Center>
                          
                        </Stack>
                        <Spacer/>
                        <Box borderRadius='10px' w='75%' >
                            <Box borderRadius='10px' border='4px' w='100%'>
                                <Center>
                                <Box>
                                <Flex>
                                <Box fontSize="45px" mr='30px'>
                                    Tổng cộng:  
                                </Box>
                                <Box  fontSize="45px">
                                    {location.state.ghe.length} x Vé
                                </Box>
                                </Flex>
                                <Flex >
                                    <Box fontSize="45px" mr="160px">
                                        Giá:
                                    </Box>
                                    <Box fontSize="45px">
                                    {location.state.ghe.length*100000} Đ
                                    </Box>
                                </Flex></Box></Center>
                                <hr/><hr/><hr/>
                                <Center fontSize="60px" fontWeight='bold'>
                                    Chọn bắp và nước
                                </Center>
                                <Center mb="20px">
                                    <SimpleGrid columns={[2, null, 2]} spacing='30px' spacingX='200px' spacingY='28px'>
                                        {List}
                                    </SimpleGrid>
                                </Center>
                            </Box>
                        </Box>
                    </Flex>

            </Box>
            
        </Stack>
        </Box>
    )
}

export default FoodDrinkList