import React, { useEffect, useState } from "react";
import { Stack, Box, Center, Flex, Icon, Button} from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
import Header from "../Header";
import {FaHome} from 'react-icons/fa';
import {BiMoviePlay, BiCategory, BiNews} from 'react-icons/bi'
import {TiTicket} from 'react-icons/ti'
import {RiUserSearchLine} from 'react-icons/ri'
import axios from "axios";
import ListCategory from "../ListCategory";
import Footer from "../Footer";

const Navbar = () => {
    const [home,setHome]=useState({BColor:"",TColor:""})
    const [movie,setMovie]=useState({BColor:"",TColor:""})
    const [category,setCategory]=useState({BColor:"",TColor:""})
    const [ticket,setTicket]=useState({BColor:"",TColor:""})
    const [recuit,setRecuit]=useState({BColor:"",TColor:""})
    const [recommend,setRecommend]=useState({BColor:"",TColor:""})
    const [ChonTheLoai,SetChonTheLoai]=useState("hidden")
    const [ChonPhim,SetChonPhim]=useState("hidden")
    const [theloai,setListTheloai]=useState([])
    useEffect(()=>{axios.get('http://localhost:8000/api/theloais/').
    then(
        res => {
            // console.log(res.data)
            setListTheloai(res.data.map((datatheloai)=>{
                return(
                    {
                        id: datatheloai.id,
                        category: datatheloai.ten_the_loai,
                        movies: datatheloai.phim
                    }
                )
            },
            ))
        }
    ).catch(error => console.log(error))
    }, [])
    return(
        <Box w='100%'>

          <Header/>
            <Center bgColor='white' h='50px' w='100%' fontSize='24px' zIndex={99} position='fixed'
            top='80px' left={'0'} right='0' >
                       
                     <Link to="">
                        <Center w='196px' h='50px' bgColor={home.BColor} color={home.TColor}
                        onMouseLeave={() => {setHome({BColor:"white",TColor:"#020e1a"})}}
                        onMouseEnter ={() => {setHome({BColor:"#020e1a",TColor:"white"})}}>
                            
                            <Flex>
                                <Icon  as={FaHome} mr='5px' mt='4px'/>
                                    Trang Chủ
                                </Flex>
                        </Center></Link>
                       
                        <Box  cursor={'pointer'}
                         onMouseLeave={() => {setMovie({BColor:"white",TColor:"#020e1a"})
                                          SetChonPhim("hidden")}}>
                        <Center w='196px' h='50px' bgColor={movie.BColor} color={movie.TColor}
                        onMouseEnter ={() => {setMovie({BColor:"#020e1a",TColor:"white"})
                                            SetChonPhim("") 
                                            }}>
                           
                               <Flex>
                                    <Icon as={BiMoviePlay} mr='5px' mt='4px'/>
                                    Phim
                                </Flex>

                        </Center> 
                        
                        <Box 
                         bgColor={"#020e1a"} w='196px'  visibility={ChonPhim}
                        position={'absolute'} left={'24.2%'} 
                        >
                            <Box mb='15px' ml='35px'>
                                <Link to='movies/now-showing' ><Button  variant={'link'} size='sm' color='white'
                                _hover={{color: "#42C2FF", textDecoration:'underline'}}>
                                Phim Đang Chiếu</Button></Link>
                               <Link to='movies/coming-soon'><Button variant={'link'} size='sm' color='white'
                               _hover={{color: "#42C2FF", textDecoration:'underline'}} >
                                Phim Sắp Chiếu</Button></Link>
                            </Box>
                       
                        </Box>
                        </Box>
                        
                        <Box  cursor={'pointer'}
                         onMouseLeave={() => {setCategory({BColor:"white",TColor:"#020e1a"})
                                           SetChonTheLoai("hidden")}} >
                        <Center w='196px' h='50px' bgColor={category.BColor} color={category.TColor}
                       
                        onMouseEnter ={() => {setCategory({BColor:"#020e1a",TColor:"white"})
                                              SetChonTheLoai("")}}>
                           
                                <Flex>
                                    <Icon as={BiCategory} mr='5px' mt='4px'/>
                                    Thể Loại
                                </Flex>
                        </Center> 
                        
                        <Box visibility={ChonTheLoai}
                         bgColor={'#020e1a'} w='590px' 
                        position={'absolute'} left={'37.1%'}
                        >
                            <ListCategory data={theloai}/>
                        </Box>
                        </Box>
                        
                        
                        <Link to="ve">
                        <Center w='196px' h='50px' bgColor={ticket.BColor} color={ticket.TColor}
                        onMouseLeave={() => {setTicket({BColor:"white",TColor:"#020e1a"})}}
                        onMouseEnter ={() => {setTicket({BColor:"#020e1a",TColor:"white"})}}>
                            
                                <Flex>
                                    <Icon as={TiTicket} mr='5px' mt='4px'/>
                                    Vé Của Tôi
                                </Flex>
                                
                        </Center></Link>
                        
                        <Link to="recuit">
                        <Center w='196px' h='50px' bgColor={recuit.BColor} color={recuit.TColor}
                        onMouseLeave={() => {setRecuit({BColor:"white",TColor:"#020e1a"})}}
                        onMouseEnter ={() => {setRecuit({BColor:"#020e1a",TColor:"white"})}}>
                            
                               <Flex>
                                    <Icon as={RiUserSearchLine} mr='5px' mt='4px'/>
                                    Tuyển Dụng
                                </Flex>
                           
                        </Center> </Link>
                        
                        <Link to="recommend">
                        <Center w='196px' h='50px' bgColor={recommend.BColor} color={recommend.TColor}
                        onMouseLeave={() => {setRecommend({BColor:"white",TColor:"#020e1a"})}}
                        onMouseEnter ={() => {setRecommend({BColor:"#020e1a",TColor:"white"})}}>
                            
                            <Flex>
                                <Icon as={BiNews} mr='5px' mt='4px' />
                                Recommend
                            </Flex>
                            
                        </Center></Link>
                    
            </Center>
        <Stack mt='130px' >
            <Box bgColor='#1F1D36'>
             
                <Outlet />
            </Box>
        </Stack>
        <Footer/>
        </Box>
    )
}

export default Navbar