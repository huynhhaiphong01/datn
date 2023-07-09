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
    Divider} from '@chakra-ui/react'
import DialogAddCategory from '../DialogAddCategory';
import axios from 'axios';
import DialogUpdateCategory from '../DialogUpdateCategory';
import DialogDeleteCategory from '../DialogDeleteCategory';
import {BsSearch} from 'react-icons/bs'

function ShowDataCategory(props) {
  const [search, setSearch]= useState("")
  const [listTheloai,setListTheloai]=useState([])
  const [message,setMessage]= useState('')
  const callbackFunction = (childData) => {
    setMessage(childData)
  }
  
 
  if(message==='Update' || message===""){ axios.get('http://localhost:8000/api/theloais/').
  then(
      res => {
          console.log(res.data)
          setListTheloai(res.data.map((datatheloai)=>{
              return(
                  {
                      id: datatheloai.id,
                      category: datatheloai.ten_the_loai,
                      phim: datatheloai.phim
                  }
              )
                }))}).catch(error => console.log(error))
              props.parentCallback(message)
              setMessage('waiting update')
              }
   
  const renderTableData=listTheloai.filter(val=>{
    if(search===""){return val}
    else if(val.category.toLowerCase().includes(search.toLocaleLowerCase())){
      return val
    }
  }).map((theloai, index) => {
    const { id, category, phim} = theloai
    console.log(phim.length)
    return (
      <Tr key={id}>
        <Td >{index+1}</Td>
        <Td >{category}</Td>
        <Td >{phim.length}</Td>
        <Td isNumeric> <DialogUpdateCategory parentCallback={callbackFunction}
         idTL={id} tenTL={category}/>
               <DialogDeleteCategory parentCallback={callbackFunction} 
               idTL={id} tenTL={category}/></Td>
      </Tr>
    )
  })
        return (
            <Box >
              <Flex w='100%' h='9%' mb='1.5%' alignItems='center'>
                <Heading  textShadow='2px 3px 4px #000'
                fontSize='6vh'>Danh sách thể loại</Heading>
                <Spacer/>
                <DialogAddCategory parentCallback={callbackFunction} />
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
                    placeholder='Tìm kiếm thể loại...'
                 />
                 </InputGroup>

                </Flex>
                <TableContainer  w='100%' 
                boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                 <Table variant='striped'>
                     <Thead bgColor={'#1F1D36'}>
                       <Tr>
                         <Th color='white'>STT</Th>
                         <Th color='white'>Tên thể loại</Th>
                         <Th color='white'>Phim</Th>
                         <Th color='white' isNumeric>Action
                         </Th>
                       </Tr>
                    </Thead>
                    <Tbody>
                      {renderTableData}
                   </Tbody>
                 </Table>
               </TableContainer>
          </Box>
        );
}


export default ShowDataCategory;