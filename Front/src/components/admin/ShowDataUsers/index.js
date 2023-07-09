import React, { useState } from 'react';
import { Box, Heading,Image,
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
import ViewUsersInFo from '../ViewUsersInfo';

import axios from 'axios'
import DialogDeleteUsers from '../DialogDeleteUsers';
import DialogGrantPermission from '../DialogGrantPermission';
import {BsSearch} from 'react-icons/bs'
import DialogAddUsers from '../DialogAddUsers';

function ShowDataUsers() {
      const [search, setSearch]= useState("")
      const [listusers, setListUsers] = useState([])
      const [message,setMessage]= useState('')
      const callbackFunction = (childData) => {
        setMessage(childData)
      }

      if(message==='Update' || message===""){ 
        axios.get('http://localhost:8000/api/users/').
        then(
            res => {
                setListUsers(res.data.map((dataUser)=>{
                    return(
                        {
                            id: dataUser.id,
                            username: dataUser.name,
                            email: dataUser.email,
                            fullname: dataUser.realname,
                            phoneNumber:dataUser.phone_number,
                            gender: dataUser.gender,
                            birth:dataUser.birth,
                            avatar :dataUser.avatar,
                            permission:dataUser.permission,
                            action:dataUser.action,
                            role:dataUser.role
                        }
                    )
                }))
            }
        ).catch(error => console.log(error))
        setMessage('wait update')
          }

        const renderTableData=listusers.filter(val=>{
          if(search===""){return val}
          else if(val.username.toLowerCase().includes(search.toLocaleLowerCase())){
            return val
          }
        }).map((user, index) => {
          const { id, username , email, avatar} = user
          return (
            <Tr key={id}>
              <Td >{index+1}</Td>
              <Td >
                <Flex alignItems={'center'}>
                <Box mr='10px' w='84px'  h='84px' bgColor={'black'} pt='3px' pl='3px' 
                borderRadius='50%'>
                <Box w='78px'  h='78px' bgColor={'white'} pt='1px' pl='1px' borderRadius='50%'>
                <Box w='76px'  h='76px' bgColor={'black'} pt='3px' pl='3px' borderRadius='50%'>
                {avatar?<Image src={'http://localhost:8000/'+ avatar} 
                 w='70px'  h='70px' borderRadius='50%'/>
                 :
                 <Image src={require('../../../imgs/default_avatar.png')} 
                 w='70px'  h='70px' borderRadius='50%'/>}  
      
                </Box>
                </Box>
                </Box>
                 {username}
                </Flex>
                </Td>
              <Td >{email}</Td>
              <Td ><ViewUsersInFo data={user}/></Td>
              <Td isNumeric> 
              <DialogGrantPermission parentCallback={callbackFunction}
                datauser={user}/>

                  <DialogDeleteUsers parentCallback={callbackFunction}
                  username={username} idUser={id}/></Td>
            </Tr>
          )
        }) 
        return (
            <Box >
              <Flex w='100%' h='9%' mb='1.5%' alignItems='center'>
                <Heading  textShadow='2px 3px 4px #000'
                fontSize='6vh'>Thông tin khách hàng</Heading>
                <Spacer/>
                <DialogAddUsers parentCallback={callbackFunction} />
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
                    placeholder='Tìm kiếm khách hàng...'
                 />
                 </InputGroup>

                </Flex>
                <TableContainer   w='100%' 
                boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                 <Table variant='striped' >
                   <Thead bgColor={'#1F1D36'}  >
                       <Tr >
                         <Th  color={'white'}>STT</Th>
                         <Th  color={'white'}>Tài khoản</Th>
                         <Th  color={'white'}>Email</Th>
                         <Th  color={'white'}>Chi tiết </Th>
                         <Th isNumeric color={'white'}>Action</Th>
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


export default ShowDataUsers;