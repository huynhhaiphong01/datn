import React from "react";
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
    Link,
    Image,
    Spacer,
    Button
} from "@chakra-ui/react"

import { ChevronRightIcon } from '@chakra-ui/icons'

const PaymentInfo = () => {
    const options = ['Monday', 'Tuesday', 'Thursday', 
  'Friday', 'Saturday', 'Sunday']
    return(
        <Box>
        <Stack minH='640px' color='white' bgColor='#1F1D36' px={164} py={18} fontFamily='Poppins'>
            <Box>
                <Heading fontSize='32px'>Thông tin phim</Heading>
                <Divider size='' mb='24px'/>
                <Breadcrumb spacing='8px' separator={<Heading><ChevronRightIcon /></Heading>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='32px'>THE BATMAN</Heading></BreadcrumbLink>
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
                    <Divider mt='24px' mb='24px'/>
                    <Flex>
                        <Stack spacing='24px'>
                            <Center borderRadius='10px' border='4px' w='255px' h='150px' p='27px'>
                                <Flex>
                                    <Box>
                                        <Heading>
                                            04
                                        </Heading>
                                        <Heading>
                                            Sun
                                        </Heading>
                                    </Box>
                                    <Box ml='25px'>
                                        <Heading fontSize='96px'>
                                            24
                                        </Heading>
                                    </Box>
                                </Flex>
                            </Center>
                            <Center borderRadius='10px' border='4px' w='255px' h='62' p='27px'>
                                    <Flex>
                                        <Box>
                                            <Heading fontSize='36px'>
                                                20:00 PM
                                            </Heading>
                                        </Box>
                                    </Flex>
                            </Center>
                        </Stack>
                        <Spacer/>
                        <Box borderRadius='10px' border='4px' w='1240px' h='350px' py='55px' px='98px' ml='84px'>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>
                            <div>Vật phẩm</div>
                            <div>Đơn giá</div>
                            <div>Số lượng</div>
                            <div>Giá</div>
                        </div>
                        <Heading>Tổng cộng</Heading>
                        <p>Chọn phương thức thanh toán</p>
                        </Box>
                        
                        <Spacer/>
                    </Flex>
                </Box>
            </Box>
        
        </Stack>
        </Box>
    )
}

export default PaymentInfo