import React, { useState } from "react";

import {
    Stack, 
    Box,
    Image,
    Heading,
    Flex,
    Text,
    Button,
} from "@chakra-ui/react"
import TrailerInfo from "../TrailerInfo";
import { Link, useLocation } from "react-router-dom";
import moment from 'moment'
const FilmInfo = (props) => {
    const location=useLocation()
    const [locationState, setLocationState]=useState({data:{
        id: "",
        title: "",
        trailer: "",
        imageUrl: "",
        thumbnail: "",
        time: "",
        length: "",
        director: "",
        actor: "",
        category:"dsadsad",
        content: "",
        finish: "",
        theloai: [{
            id: '',
            ten_the_loai: ''
        }],
        suatchieu: []
    }, check: ''})
    React.useEffect(() =>{
        if(location.state){
            let _state=location.state
            setLocationState(_state)
            console.log(_state)
        }
    }, [])

    let tl=""
    function xuliTL(item,index,arr){
         if(index===locationState.data.theloai.length-1)
         {tl=tl+arr[index].ten_the_loai}
         else {tl=tl+arr[index].ten_the_loai+", "}
    }
    locationState.data.theloai.forEach(xuliTL)
    const bgC="linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("
    const bgImg=bgC+"http://localhost:8000/"+locationState.data.thumbnail+")"
    return(
        <Stack   color='white' 
        bg={bgImg}
        backgroundPosition= 'center'
        backgroundRepeat= 'no-repeat'
        backgroundSize= 'cover'
         px={164} py={18} fontFamily='Poppins'>
            <Box>
                <Heading fontSize='32px'>Thông tin phim</Heading>
                <hr style={{marginTop:'10px', marginBottom:'15px'}}/>
                <Flex>
                    <Box>
                        <Image  w='407px' h='600px' src={"http://localhost:8000/"+locationState.data.imageUrl}/>
                    </Box>
                    <Box flex={1} ml='55px'>
                        <Heading fontSize='32px'>{locationState.data.title}</Heading>
                        <hr style={{marginTop:'10px', marginBottom:'15px'}}/>
                        <Box mb='23px' fontSize='20px'>
                            <Flex>
                                <Text fontWeight='bold'>Đạo diễn: </Text>
                                <Text ml='1'>{locationState.data.director}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Diễn viên: </Text>
                                <Text  ml='1'>{locationState.data.actor}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Thể loại: </Text>
                                <Text  ml='1'>{tl}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Khởi chiếu: </Text>
                                <Text ml='1'>{!locationState.data.time?"":moment(locationState.data.time).format("DD/MM/YYYY")}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Thời lượng: </Text>
                                <Text ml='1'>{locationState.data.length} {locationState.data.length?'phút':''}</Text>
                            </Flex>

                            <Flex>
                                <Text fontWeight='bold'>Dự kiến kết thúc: </Text>
                                <Text ml='1'>{!locationState.data.finish?"":moment(locationState.data.finish).format("DD/MM/YYYY")}</Text>
                            </Flex>
                        </Box>
                        <Flex>
                          {locationState.check==='0'?
                          localStorage.getItem('user-info')?
                          <Link to='/home/movie-info/lich-chieu' state={{data:locationState.data.suatchieu, tenphim: locationState.data.title}}>
                          <Button mr='20px' fontSize='24px' h='63px' w='164px' 
                          colorScheme='blue'>Mua Vé</Button></Link>:
                          <Link to='/login'>
                          <Button mr='20px' fontSize='24px' h='63px' w='164px' 
                          colorScheme='blue'>Mua Vé</Button></Link>
                           : null}
                          
                          <TrailerInfo trailerProp={locationState.data.trailer}/>
                        </Flex>
                     
                        <hr style={{marginTop:'24px', marginBottom:'10px'}}/>
                        <Box>
                            <Heading fontSize='32px' mb='2px'>Tóm tắt nội dung</Heading>
                            <Text fontSize='20px'>
                             {locationState.data.content}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Stack>
    )
}

export default FilmInfo