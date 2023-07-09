
import React, { useState } from "react";
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
    list,
    Text
} from "@chakra-ui/react"

import Moment from  'moment'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Footer from "../Footer";
import { Link, useLocation } from "react-router-dom";

const Showtimes = (props) => {
    const location=useLocation()
    const [locationState, setLocationState]=useState({data:[

    ], tenphim: ''})
    React.useEffect(() =>{
        if(location.state){
            let _state=location.state
            setLocationState(_state)
            console.log(_state)
        }
    }, [])

    const List = locationState.data.map((item)=>{
        return(
            <Link key={item.id} to="/home/movie-info/lich-chieu/chon-ghe" state={{data:item, tenphim: locationState.tenphim}}>
                <Center borderRadius='10px' border='4px' py={2} _hover={{color: "#42C2FF"}}>
                    <Box ml ="50px">
                        <Text fontSize='18px'>
                            Phòng chiếu : {item.phongchieu_name}
                        </Text>
                        <Text fontSize='18px'>
                            Ngày chiếu: {Moment(item.ngay_chieu).format("ddd, DD/MM/YYYY")}
                        </Text>
                        <Text fontSize='18px'>
                            Tình trạng : { item.ghe_da_chon} / {item.soluong_ghe}
                        </Text>
                        <Text fontSize='18px'>
                            Thời gian :
                        </Text>
                        <Flex w='255px'>
                            <Text fontSize='18px'>
                                {Moment(item.gio_bat_dau, "h:mm:ss").format("LT")} {"-"}
                            </Text>
                            <Text fontSize='18px' ml="1">
                                {Moment(item.gio_ket_thuc, "h:mm:ss").format("LT")}
                            </Text>
                        </Flex>
                    </Box>
                </Center>
            </Link>
        )
    })

    return(
        <Box>
        <Stack minH='640px' color='white' bgColor='#1F1D36' px={164} py={18} fontFamily='Poppins'>
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
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>CHỌN LỊCH CHIẾU</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box>
                    <Divider mt='24px' mb='24px'/>
                    <Center >
                        <Box>
                            <SimpleGrid columns={[2, null, 3]} spacing='20px' spacingX='84px'>
                                {List}
                            </SimpleGrid>
                        </Box>
                    </Center>
                    <Divider mt='24px' mb='24px'/>
                </Box>
            </Box>
        </Stack>
        <Footer/>
        </Box>
    )
}

export default Showtimes