import axios from "axios";
import React, { useState } from "react";
import { Box,  Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    InputGroup,
    Input,
    Spacer,
    InputLeftElement,
    Divider,} from '@chakra-ui/react'
import DialogAddPopcorn from "../DialogAddPopcorn";
import DialogUpdatePopcorn from "../DialogUpdatePopcorn";
import DialogDeletePopcorn from "../DialogDeletePopcorn";
import {BsSearch} from 'react-icons/bs'

const ShowDataPopcorn = () => {
    const [listPopcorn, setListPopcorn] = useState([])
    const [search, setSearch]= useState("")
    const [message, setMessage] =useState('')
    const callbackFunction = (childData) => {
        setMessage(childData)
    }

    if(message === 'Update' || message === ""){
        axios.get('http://localhost:8000/api/food_drinks/')
        .then(
            res => {
                setListPopcorn(
                    res.data.data.map((popcorn) => {
                        return(
                            {
                                id: popcorn.id,
                                ten: popcorn.ten,
                                gia: popcorn.gia,
                                image: popcorn.image,
                                food_drink_bill: popcorn.food_drink_bill
                            }
                        )
                    })
                )
            }
        ).catch(error => console.log(error))
        setMessage('waiting update')
    }

    console.log(listPopcorn)

    const renderTableData=listPopcorn.filter(val=>{
        if(search===""){return val}
        else if(val.ten.toLowerCase().includes(search.toLocaleLowerCase())){
          return val
        }
      }).map((popcorn, index) => {
        const { id, ten, gia, food_drink_bill} = popcorn
        return (
            <Tr key={id}>
                <Td >{index+1}</Td>
                <Td >{ten}</Td>
                <Td >{gia} đ</Td>
                <Td >{food_drink_bill}</Td>
                <Td isNumeric> 
                <DialogUpdatePopcorn data={popcorn} parentCallback={callbackFunction} />
                <DialogDeletePopcorn parentCallback={callbackFunction} 
                    data={popcorn}/>
                    </Td>
            </Tr>
            )
        })

    return(
        <Box >
           <Flex w='100%' h='9%' mb='1.5%' alignItems='center'>
                <Heading  textShadow='2px 3px 4px #000'
                fontSize='6vh'>Danh sách bắp nước</Heading>
                <Spacer/>
                <DialogAddPopcorn parentCallback={callbackFunction}/>
              </Flex>
              <Divider bgColor='#1F1D36' h={'3px'} />
               

                <Flex mt='2%' mb='3%' w='100%' h='9%' justifyContent={'center'}>  
                 <InputGroup size='md' w='50%' h='100%'>
                  <InputLeftElement>
                   <BsSearch/>
                  </InputLeftElement>
                 <Input
                    onChange={(e)=>{setSearch(e.target.value)}}
                    border='2px'
                    focusBorderColor='none'
                    shadow='0px 3px 3px 3px rgb(131, 131, 131)'
                    borderRadius='12px'
                    type='text'
                    placeholder='Tìm kiếm bắp nước...'
                 />
                 </InputGroup>

                </Flex>
            <TableContainer   w='100%' 
            boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                <Table variant='striped'>
                    <Thead bgColor={'#1F1D36'}>
                    <Tr>
                        <Th color='white'>STT</Th>
                        <Th color='white'>Tên thực phẩm</Th>
                        <Th color='white'>Giá</Th>
                        <Th color='white'>Đã bán</Th>
                        <Th color='white' isNumeric>Action</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {renderTableData}
                    </Tbody>
                </Table>
            </TableContainer>
            
        </Box>
    )
}

export default ShowDataPopcorn