import React, { useState } from 'react';
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
import DialogAddRoom from '../DialogAddRoom';
import DialogDeleteRoom from '../DialogDeleteRoom';
import DialogUpdateRoom from '../DialogUpdateRoom';
import axios from 'axios';
import {BsSearch} from 'react-icons/bs'
function ShowDataCinemaRoom(){
    const [listRoom,setListRoom]=useState([])
    const [search, setSearch]= useState("")
    const [message,setMessage]= useState('')
    const callbackFunction = (childData) => {
      setMessage(childData)
    }
    if(message==='Update' || message===""){ axios.get('http://localhost:8000/api/phongchieus/').
    then(
        res => {
            setListRoom(res.data.data.map((dataRoom)=>{
                return(
                    {
                        id: dataRoom.id,
                        name: dataRoom.ten_phong,
                        row: dataRoom.soluong_day,
                        col: dataRoom.soluong_cot
                    }
                )
                  }))}).catch(error => console.log(error))
                setMessage('waiting update')
                }
    const renderTableData=listRoom.filter(val=>{
      if(search===""){return val}
      else if(val.name.toLowerCase().includes(search.toLocaleLowerCase())){
        return val
      }
    }).map((room, index) => {
        const { id, name, row, col} = room
        return (
          <Tr key={id}>
            <Td >{index+1}</Td>
            <Td >{name}</Td>
            <Td >{row}</Td>
            <Td >{col}</Td>
            <Td isNumeric> 
            <DialogUpdateRoom data={room} parentCallback={callbackFunction} />
            <DialogDeleteRoom parentCallback={callbackFunction} 
                   data={room}/>
                   </Td>
          </Tr>
        )
      })
    return(
        <Box >
        <Flex w='100%' h='9%' mb='1.5%' alignItems='center'>
                <Heading  textShadow='2px 3px 4px #000'
                fontSize='6vh'>Danh sách phòng chiếu</Heading>
                <Spacer/>
                <DialogAddRoom parentCallback={callbackFunction}/>
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
                    placeholder='Tìm kiếm phòng chiếu...'
                 />
                 </InputGroup>

                </Flex>
        <TableContainer  w='100%' 
        boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
         <Table variant='striped'>
             <Thead bgColor={'#1F1D36'}>
               <Tr>
                 <Th color='white'>STT</Th>
                 <Th color='white'>Tên phòng</Th>
                 <Th color='white'>Số hàng</Th>
                 <Th color='white'>Số cột </Th>
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

export default ShowDataCinemaRoom