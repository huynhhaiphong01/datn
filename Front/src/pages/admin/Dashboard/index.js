import React, { useState } from 'react';
import { Box,  Flex, HStack, Image,Spacer,Text, VStack} from '@chakra-ui/react'
import { Link, Navigate, Outlet} from 'react-router-dom';

function Dashboard() {
        const [bgStyle,setBgStyle]=useState("")
        const [bgStyle2,setBgStyle2]=useState("")
        const [bgStyle3,setBgStyle3]=useState("")
        const [bgStyle4,setBgStyle4]=useState("")
        const [bgStyle5,setBgStyle5]=useState("")
        const [bgStyle6,setBgStyle6]=useState("")
        const [bgStyle7,setBgStyle7]=useState("")
        
        if(JSON.parse(localStorage.getItem('user-info')).action.includes("DASHBOARD")){
          return (
              <Box w='100%'>
                 <HStack bgColor='#1F1D36' h='10%' padding='0.5%' pr='2%' position={'fixed'}
                 left='0' top='0' right='0' zIndex={10} w='100%'>
                <Flex alignItems='center' h='100%' w='100%' ml='2%'>  
              
                  <Image
                        borderRadius='full'
                        w='4.5%' h='100%'
                        src={require('../../../imgs/Logo2.png')}
                        alt='Logo'
                    />
                    <Text ml='0.5%' color='white' fontSize={'2vw'} >
                            CPM ADMIN
                      </Text>
                      <Spacer/>
                  <Link to='/' style={{width:'2.5%', height: '60%'}}>
                    <Image  src={require('../../../imgs/logout.png')}
                        w='100%' h='100%'/>   
                  </Link>  
                  </Flex>
             </HStack>
             <Box  w='100%'  display='flex'>
                 <VStack bgColor='#3D3C4D' w='20%' spacing='3' position={'fixed'} top='10%'
                 left='0' bottom='0'>
                    <Box w='90%' bgColor='white' h='0.5%' borderRadius='4px' mt='4%'></Box>
                    <Link to='revenue' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%'
                      onMouseLeave={(e) => {setBgStyle("")}}
                      onMouseEnter ={(e) => {setBgStyle("#1F1D36")}} 
                      borderRadius='6px' bgColor={bgStyle} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/revenue.png')}
                         w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                        mt='5%'
                          >Doanh thu</Text>
                      </Flex>
                    </Link>
  
                    <Link to='film' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%' borderRadius='6px'
                        onMouseLeave={(e) => {setBgStyle2("")}}
                        onMouseEnter ={(e) => {setBgStyle2("#1F1D36")}} 
                       bgColor={bgStyle2} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/film.png')}
                        w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                          mt='5%'>Phim</Text>
                      </Flex>
                    </Link>
  
                    <Link to='category' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%' borderRadius='6px' 
                        onMouseLeave={(e) => {setBgStyle3("")}}
                        onMouseEnter ={(e) => {setBgStyle3("#1F1D36")}} 
                        bgColor={bgStyle3} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/category.png')}
                        w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                          mt='5%'>Thể loại</Text>
                      </Flex>
                    </Link>
  
                    <Link to='users' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%' borderRadius='6px' 
                      onMouseLeave={(e) => {setBgStyle4("")}}
                      onMouseEnter ={(e) => {setBgStyle4("#1F1D36")}}  
                      bgColor={bgStyle4} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/user.png')}
                        w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                          mt='5%'>Tài khoản</Text>
                      </Flex>
                    </Link>

                    <Link to='cinema-room' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%' borderRadius='6px' 
                      onMouseLeave={(e) => {setBgStyle5("")}}
                      onMouseEnter ={(e) => {setBgStyle5("#1F1D36")}}  
                      bgColor={bgStyle5} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/room.png')}
                        w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                          mt='5%'>Phòng chiếu</Text>
                      </Flex>
                    </Link>

                    <Link to='showtime' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%' borderRadius='6px' 
                      onMouseLeave={(e) => {setBgStyle6("")}}
                      onMouseEnter ={(e) => {setBgStyle6("#1F1D36")}}  
                      bgColor={bgStyle6} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/showtime.png')}
                        w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                          mt='5%'>Suất chiếu</Text>
                      </Flex>
                    </Link>

                    <Link to='popcorn' style={{width:'90%', height:'10%'}}>
                      <Flex h='100%'  w='100%' borderRadius='6px' 
                      onMouseLeave={(e) => {setBgStyle7("")}}
                      onMouseEnter ={(e) => {setBgStyle7("#1F1D36")}}  
                      bgColor={bgStyle7} alignItems='center'>
                        <Image ml='10%' src={require('../../../imgs/popcorn.png')}
                        w='15%' h='60%'/>
                        <Text color='white' fontFamily='Poppins' fontSize='4vh' ml='7%'
                          mt='5%'>Bắp nước</Text>
                      </Flex>
                    </Link>
                 </VStack>
                 <Box  w='80%' ml='20%' mt='5%' 
                      p='1% 2% 3% 2%'>
                   <Outlet/>
                 </Box>
             </Box>
            </Box>
          );
        }
        else {return <Navigate to="/home" replace />}
}


export default Dashboard;