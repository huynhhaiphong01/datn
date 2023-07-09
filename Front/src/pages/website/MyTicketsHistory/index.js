import React, { useEffect, useState } from 'react';
import { Box, Flex,  Heading, Icon,Breadcrumb, BreadcrumbItem, BreadcrumbLink, Image,  Text, useDisclosure} from '@chakra-ui/react'
import axios from 'axios';
import moment from 'moment';
import MyTicketDialog from '../../../components/website/MyTicketDialog';
import { ChevronRightIcon } from "@chakra-ui/icons";
import {FaHome} from 'react-icons/fa';

const MyTicketsHistory = () => {
    const [hoaDon, setHoaDon] = useState([])
    const {isOpen, onOpen, onClose} = useDisclosure()
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/hoadonbyuser/${JSON.parse(localStorage.getItem('user-info')).id}`).
            then(
                res => {
                    setHoaDon(res.data.data)
                }
            ).catch(error => console.log(error))
        },[])
    console.log(hoaDon)
    // console.log(phim)

    const List = hoaDon.map((item, index)=> {
        return(
            <Flex mb="10px" overflow="hidden" color="white" bgGradient='linear(to-r, #7928CA, #FF0080)' borderRight="1px" borderTop="1px">
                <Text bgColor="blackAlpha.800" color="white" w="15%" borderRight="1px" display="flex" justifyContent="center" alignItems="center">{index+1}</Text>
                <Box w="85%">
                    <Box >
                        <Flex>
                            <Image
                                w="18%"
                                src={"http://localhost:8000/" + item.phim.poster}
                            />
                            <Box fontSize="24px" px="10px" py="10px" ml='30px'>
                                <Box w="100%" display="flex" justifyContent="center" alignItems="center">
                                    {item.phim.ten_phim}
                                </Box>
                                <Text>
                                    Ngày Mua: {moment(item.ngay_mua).format("DD/MM/YYYY")}
                                </Text>
                                <Box>
                                    Phòng chiếu: {item.phim.suatchieu.phongchieu_name}
                                </Box>
                                <Box>
                                    Ngày chiếu: {moment(item.phim.suatchieu.ngay_chieu).format("DD/MM/YYYY")}
                                </Box>
                                <Box>
                                    Khung giờ: {moment(item.phim.suatchieu.gio_bat_dau, "h:mm:ss").format("LT")} - {moment(item.phim.suatchieu.gio_ket_thuc, "h:mm:ss").format("LT")}
                                </Box>
                                <Box>
                                    {item.vephim.length} x Vé
                                </Box>
                                <Box>
                                    Giá: {item.gia} đ
                                </Box>
                                <Flex>
                                    <Text mr="5px">
                                        Ghế: 
                                    </Text>
                                    <Box>
                                    {
                                        item.vephim.map(item=>{
                                            return(
                                                item.ghengoi.ma_ghe
                                            )
                                        }).join(", ")
                                    }
                                    </Box>
                                </Flex>
                            </Box>
                            <Box mt="130px" mr="20px" display="flex" justifyContent="center" alignItems="center">
                            <MyTicketDialog data={item}/>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        )
    })
    return(
        <Box minH='640px' color='white' px={50} py={18}  >
              <Breadcrumb spacing='8px' separator={<Text fontSize={'32px'}><ChevronRightIcon /></Text>}>
                    <BreadcrumbItem  >
                        <BreadcrumbLink  >
                            <Icon  as={FaHome}  fontSize='32px' />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink ><Heading fontSize='24px'>Vé của tôi</Heading>
                        </BreadcrumbLink></BreadcrumbItem>
                </Breadcrumb>
            <hr/>
            <Heading fontSize="5xl" display="flex" justifyContent="center" alignItems="center" color="white" mt='20px'>LỊCH SỬ MUA VÉ</Heading>
            <Box mt="30px" px='60px' >
                {List}
            </Box>
        </Box>
    )
}

export default MyTicketsHistory