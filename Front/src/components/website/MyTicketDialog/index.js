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
    useToast,
    IconButton,
    Image,
    Heading,
    Spacer,
    Divider} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons';
import moment from 'moment';

function MyTicketDialog(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
        return(
        <>
        <IconButton 
            onClick={onOpen}
            borderRadius="50%"
            variant='outline'
            colorScheme='white'
            fontSize='20px' icon={<InfoIcon/>}/>
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            size="4xl"
            >
            <AlertDialogOverlay >
            <AlertDialogContent  bgColor='white' border='2px' borderColor='#42C2FF'
            alignSelf='center' 
            >
                <Flex>
                    <Box w="40%" fontSize="24px" color="blackAlpha.400" borderRight="1px">
                        <Image w="100%" objectFit="cover" h='100%' src={"http://localhost:8000/"+ props.data.phim.poster}/>
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
                                        PHIM: {props.data.phim.ten_phim} 
                                    </Text>
                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                        Số lượng: {props.data.vephim.length} VÉ
                                    </Text>
                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                        Phòng chiếu: {props.data.phim.suatchieu.phongchieu_name}
                                    </Text>
                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                    Ngày chiếu: {moment(props.data.phim.suatchieu.ngay_chieu).format("DD/MM/YYYY")}
                                    </Text>
                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                        Khung giờ: {moment(props.data.phim.suatchieu.gio_bat_dau, "h:mm:ss").format("LT")} - {moment(props.data.phim.suatchieu.gio_ket_thuc, "h:mm:ss").format("LT")}
                                    </Text>
                                    <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                        Ghế: {
                                            props.data.vephim.map(item=>{
                                                return(
                                                    item.ghengoi.ma_ghe
                                                )
                                            }).join(", ")
                                        }
                                    </Text>
                                    {
                                        props.data.food_drink_bill.length?
                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                            Đồ ăn: {
                                                props.data.food_drink_bill.map(item => {
                                                        return(
                                                            item.so_luong+ "x"+ item.ten+", "
                                                        )
                                                })
                                            }
                                        </Text>:
                                        null
                                    }
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
                                            {props.data.user_name}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                            Tên khách hàng:
                                        </Text>
                                        <Spacer/>
                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                            {props.data.user_realname}
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
                                            ngày giao dịch:
                                        </Text>
                                        <Spacer/>
                                        <Text ml="20px" fontSize="20px" color="gray" fontWeight="bold">
                                            {moment(props.ngay_mua).format("DD/ MM/ YYYY")}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Divider mt="20px"/>
                            <Heading color="gray">
                                Tổng cộng: {props.data.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")} đ
                            </Heading>
                            <Divider mt="20px"/>
                        </Box>
                    </Box>
                </Flex>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>
    )
}



export default MyTicketDialog;