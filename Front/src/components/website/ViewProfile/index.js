import React from 'react';
import { Box, Button,  Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import moment from 'moment'


function ViewProfile() {
        return (
          <Box bgColor='white' w='450px' h='500px' 
          boxShadow='10px 10px 10px #7c76ad'
          margin='0px 0px 0px 120px' borderRadius='10px' p='20px 10px 0px 10px'
          >

            <Text  color='black' align='center' fontSize='36px' fontWeight='bold'>
              Thông tin tài khoản</Text>
            <Text color='black'mt='10px' marginLeft='60px'>Họ và tên</Text>
            
            <Box  w="310px"
               h="30px"
               m='10px 0px 10px 60px'  borderColor='blue'
               borderRadius="10px"
               border="2px">
              <Text ml='10px' color='black' fontSize='18px'>{JSON.parse(localStorage.getItem('user-info')).realname}</Text>
            </Box>

            <Text color='black' marginLeft='60px'>Số điện thoại</Text>
            
             <Box  w="310px"
               h="30px"
               m='10px 0px 10px 60px'  borderColor='blue'
               borderRadius="10px"
               border="2px">
              <Text ml='10px' color='black' fontSize='18px'>{JSON.parse(localStorage.getItem('user-info')).phone_number}</Text>
            </Box>
          
            <Text color='black' marginLeft='60px'>Email</Text>
            <Box  w="310px"
               h="30px"
               m='10px 0px 10px 60px'  borderColor='blue'
               borderRadius="10px"
               border="2px">
               <Text ml='10px' color='black' fontSize='18px'>{JSON.parse(localStorage.getItem('user-info')).email}</Text>
            </Box>
            <Text color='black' marginLeft='60px'>Ngày sinh</Text>
            <Box  w="310px"
               h="30px"
               m='10px 0px 10px 60px'  borderColor='blue'
               borderRadius="10px"
               border="2px">
               <Text ml='10px' color='black' fontSize='18px'>{moment(JSON.parse(localStorage.getItem('user-info')).birth).format("DD/MM/YYYY")}</Text>
            </Box>

                
         <Link to='/profile/editprofile'>
         <Button 
            colorScheme='blue'
            bgColor='#42C2FF'
            color='white'
            size='lg'
            borderRadius="10px"
            w="245px"
            h="35px"
            margin='20px 0px 20px 92px'
          >Sửa thông tin</Button>
         </Link>
        </Box>
        );
}




export default ViewProfile;