import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Icon, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {FaHome} from 'react-icons/fa';
import axios from 'axios'


function Recommmend(){
    const [re, setRe] = useState([]);
    const [id, setId] = useState(JSON.parse(localStorage.getItem("user-info")).id)
    useEffect(()=>{
        console.log({id})
      },[id])
    useEffect(() => {    
        const fetchRe = async () => {
            axios.post('http://127.0.0.1:5000/pre', {user_id: id}).then((response) => {
                setRe(response.data);
                console.log(re);
            }
            )
                .catch((error) => {
                    console.error('Error fetching Recommend info:', error);
                }
                );
        };
        fetchRe();
    }, []);

    return(
        <Stack minH='640px' color='white' bgColor='#1F1D36'  px={120} py={18}>
              <Box>
                <Breadcrumb spacing='8px' separator={<Text fontSize={'32px'}><ChevronRightIcon /></Text>}>
                    <BreadcrumbItem  >
                        <BreadcrumbLink >
                            <Icon pt='6px' as={FaHome}  fontSize='32px' />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink ><Heading fontSize='24px'>Recommend</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <hr/>
                </Box>
                <Box color={'white'}>
                <Heading fontSize='34px' mb='20px'>ĐỀ XUẤT PHIM</Heading>
                <TableContainer border={'2px'} w='120%'>
                <Table variant='simple'>
                    <Thead >
                        <Tr>
                        <Th color={'white'}>STT</Th>
                        <Th color={'white'}>Movie</Th>
                        <Th color={'white'}>Điểm dự đoán</Th>
                        </Tr>
                    </Thead>
                    <Tbody  fontSize='17px'>
                        {re.map((re,index)=>(
                            <Tr>
                            <Td>{index + 1}</Td>
                            <Td>{re.movie}</Td>
                            <Td>{re.predicted_rating.toFixed(2)}</Td>
                        </Tr>
                        )
                        )}
                        

                       
                    </Tbody>
            </Table></TableContainer>
            </Box>
        </Stack>
    )
}

export default Recommmend