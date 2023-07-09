import './Styles.css';
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
    Button,
    Text,
    Spacer,
} from "@chakra-ui/react"

import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const SeatList = () => {
    const [checked, setChecked] = useState([])
    const [seatCode,setSeatCode] = useState([])
    const location=useLocation()
    const [seats,setSeats]=useState([])
    const navigate= useNavigate() 
    const [locationState, setLocationState]=useState({data:[

    ], tenphim: ''})
    React.useEffect(() =>{
        if(location.state){
            let _state=location.state
            setLocationState(_state)
            console.log(_state)
            console.log(_state.data.ghe)
            console.log(checked)
        }
    }, [])
    useEffect(()=>{
        console.log(checked)
    },[checked])

    useEffect(()=>{
        console.log(seatCode)
    },[seatCode])

    useEffect(()=>{
        setSeats(location.state.data.ghe.map((item)=>{
            return(
                {
                    id: item.id,
                    suatchieu_ID: item.suatchieu_ID,
                    ma_ghe: item.ma_ghe,
                    color : 'gray'
                }
            )
        }))
        
    },[])


    const List = seats.map((item)=>{
        return(
                (item.suatchieu_ID.includes(location.state.data.id))?
                <Box bgColor="red.400" borderTopLeftRadius='50%' borderTopRightRadius='50%'
                 w="35px" h="30px" key={item.id} display='flex' userSelect={'none'} cursor='not-allowed'
                 justifyContent={'center'} alignItems='center'>{item.ma_ghe}
                </Box>:
                <Box key={item.id} bgColor={item.color} borderTopLeftRadius='50%' 
                borderTopRightRadius='50%'
                 display='flex' justifyContent={'center'} alignItems='center' cursor='pointer'
                 w="35px" h="30px" >
                <input style={{width: "32px", cursor:'pointer', position:'absolute',
                                    height: "30px", opacity:'0'
                    }} value={item.id} type="checkbox" onChange={
                        (e)=>{
                            var updateList = [...checked];
                            var updateList2= [...seatCode];
                            if (e.target.checked){
                                updateList = [...checked, e.target.value]
                                updateList2= [...seatCode,item.ma_ghe]
                                setSeats(prevState=>{
                                    return prevState.map((prev)=>{
                                        if(prev.id===item.id){
                                            prev.color='green.400'
                                        }
                                        return prev
                                    })
                                })
                            }
                            else{
                                updateList.splice(checked.indexOf(e.target.value), 1)
                                updateList2.splice(seatCode.indexOf(item.ma_ghe), 1)
                                setSeats(prevState=>{
                                    return prevState.map((prev)=>{
                                        if(prev.id===item.id){
                                            prev.color='gray'
                                        }
                                        return prev
                                    })
                                })
                                
                            }
                            setSeatCode(updateList2)
                            setChecked(updateList)
                        }
                    }/>
                {item.ma_ghe}
              

                </Box>
        )
    })
    
    return(
        <Box>
        <Stack minH="640px" color='white' bgColor='#1F1D36' px={164} py={18} fontFamily='Poppins'>
            <Box>
                <Heading fontSize='32px'>Thông tin phim</Heading>
                <Divider size='' mb='24px'/>
                <Breadcrumb spacing='8px' separator={<Heading><ChevronRightIcon /></Heading>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>{locationState.tenphim}</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>MUA VÉ</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>CHỌN LỊCH CHIẾU</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>CHỌN GHẾ</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box>
                    <Divider mt='10px' mb='24px'/>
                    <Flex>
                        <Stack spacing='24px'>
                          <Center borderRadius='10px' border='4px' w='255px' p='10px'>
                                <Center>
                                    <Box>
                                        <Heading textAlign='center' fontSize='36px'>
                                            {location.state.data.phongchieu_name}
                                        </Heading>
                                    </Box>
                                   
                                </Center>
                            </Center>
                            <Center borderRadius='10px' border='4px' w='255px' p='15px'>
                                <Center>
                                    <Box>
                                        <Heading textAlign='center' fontSize='36px'>
                                            {moment(location.state.data.ngay_chieu).format("ddd DD/MM/YYYY")}
                                        </Heading>
                                    </Box>
                                   
                                </Center>
                            </Center>
                            <Center borderRadius='10px' border='4px' w='255px' h='62' p='10px'>
                                    <Flex>
                                        <Box>
                                        <Heading fontSize='22px' textAlign='center'>
                                                {moment(location.state.data.gio_bat_dau,'h:mm:ss').format("LT")} - {moment(location.state.data.gio_ket_thuc,'h:mm:ss').format("LT")}
                                            </Heading>
                                        </Box>
                                    </Flex>
                            </Center>

                            <Center borderRadius='10px' border='4px' w='255px'>
                                <Box w='100%'>
                                <Heading fontSize='25px' textAlign='center' m='5px'>Ghế đang chọn</Heading>
                                <hr/><hr/><hr/>
                                <Heading fontSize='20px' m='8px' textAlign='center'>
                                       {seatCode.length===0?'Không có ghế được chọn':seatCode.map(i=>i).join(', ')}
                                    </Heading>
                                </Box>
                            </Center>
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
                            {checked.length===0?
                                <Button  disabled
                                    colorScheme='blue'
                                    color='white'
                                    size='lg'
                                    borderRadius="8px"
                                    w="80px"
                                    h="40px"
                                >Next
                                </Button>:
                                 <Link to="/home/movie-info/lich-chieu/chon-ghe/chon-food-drink" state={{data:location.state, ghe: checked, seatCode:seatCode}}>
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
                            }
                            </Center>
                        </Stack>
                        <Spacer/>
                        <Box borderRadius='10px' w='75%'  border={'4px'}>
                            <Text fontSize='30px' textAlign='center'>Người/ Ghế</Text>
                            <hr /><hr/><hr/>
                          <Center mt='20px'>
                           <Box >
                            <div className="Cinema">
                            <div className="screen" />
                            </div>    
                            <SimpleGrid columns={[2, null, location.state.data.soluong_cot]} spacing='10px' >
                                {List}
                            </SimpleGrid>
                            </Box>
                            </Center>
                            <Center mt='30px'mb='20px'>
                                <Flex alignItems='center'>
                                    <Box bgColor="gray" borderTopLeftRadius='50%' borderTopRightRadius='50%'
                 w="30px" h="25px"></Box>
                                    <Text ml='10px' fontSize='17px'>Trống</Text>
                                </Flex>
                                <Flex alignItems='center' ml='50px' mr='50px'>
                                    <Box bgColor="green.400" borderTopLeftRadius='50%' borderTopRightRadius='50%'
                 w="30px" h="25px"></Box>
                                    <Text ml='10px' fontSize='17px'>Đang chọn</Text>
                                </Flex>
                                <Flex alignItems='center'>
                                    <Box bgColor="red.400" borderTopLeftRadius='50%' borderTopRightRadius='50%'
                 w="30px" h="25px"></Box>
                                    <Text ml='10px' fontSize='17px'>Đã chọn</Text>
                                </Flex>
                            </Center>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            
        </Stack>
        </Box>
    )
}

export default SeatList