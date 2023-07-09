import React, { useEffect, useState } from 'react';
import { Box,  Flex, Image,  Text} from '@chakra-ui/react'
import axios from 'axios';
import moment from 'moment';
import MyTicketDialog from '../MyTicketDialog';


function MyTickets() {
    const [hoaDon, setHoaDon] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/hoadonbyuser/${JSON.parse(localStorage.getItem('user-info')).id}`).
            then(
                res => {
                    setHoaDon(res.data.data)
                }
            ).catch(error => console.log(error))
        },[])
    console.log(hoaDon)

    const List = hoaDon.map((item, index)=> {
        return(
            <Flex mb="10px" overflow="hidden" borderTopRightRadius="40px" borderBottomLeftRadius="40px" color="white" bgGradient='linear(to-r, #7928CA, #FF0080)' borderRight="1px" borderTop="1px">
                <Text bgColor="blackAlpha.800" color="white" w="15%" borderRight="1px" display="flex" justifyContent="center" alignItems="center">{index+1}</Text>
                <Box w="85%">
                    <Box>
                        <Flex>
                            <Image
                                w="20%"
                                src={"http://localhost:8000/" + item.phim.poster}
                            />
                            <Box px="10px" py="10px">
                                <Box w="100%" display="flex" justifyContent="center" alignItems="center">
                                    {item.phim.ten_phim}
                                </Box>
                                <Text>
                                    Ngày Mua: {moment(item.ngay_mua).format("DD/MM/YYYY")}
                                </Text>
                                <Box>
                                    {item.vephim.length} x Vé
                                </Box>
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
                            <Box mt="80px" mr="10px" display="flex" justifyContent="center" alignItems="center">
                            <MyTicketDialog data={item}/>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        )
    })

    return (
        <Box bgColor='white' w='600px' h='500px' 
        boxShadow='10px 10px 10px #7c76ad'
        margin='0px 0px 0px 120px' borderRadius='10px'
        padding='10px'
        overflow="hidden"
        >
        <Text color='black' fontWeight='bold' fontSize='3xl'
            textAlign='center' marginTop='20px'
        >VÉ CỦA TÔI</Text>
        <Box h="80%" overflow="auto"
        css={{
            '&::-webkit-scrollbar':{
                width: '4px',
            },
            '&::-webkit-scrollbar-track':{
                width: '6px',
            },
            '&::-webkit-scrollbar-thumb':{
                background: 'rgb(0, 100, 255, 0.3)',
                borderRadius: '20px'
            },
        }}
        >
            {List}
        </Box>
        </Box>
    );
}




export default MyTickets;