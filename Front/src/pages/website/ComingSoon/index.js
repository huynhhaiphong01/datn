import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
     Flex, Heading, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {FaHome} from 'react-icons/fa';
import { Link } from "react-router-dom";
import FilmListUpcoming from "../../../components/website/FilmListUpComing";

function ComingSoon(props){
  const listphimsapchieu = []
  const [listphim, setListphim] = useState([])
  function xulyphim(item, index, arr){
      if(!(Date.parse((arr[index].time)) <= Date.now())){
          listphimsapchieu.push(arr[index])
      }
  }
  useEffect(()=>{
      axios.get('http://localhost:8000/api/phims/').
      then(
          res => {
            console.log(res.data)
              setListphim(res.data.map((dataphim)=>{
                  return(
                      {
                          id: dataphim.id,
                          title: dataphim.ten,
                          trailer: dataphim.trailer,
                          imageUrl: dataphim.poster,
                          thumbnail: dataphim.thumbnail,
                          time:dataphim.ngay_chieu,
                          length: dataphim.thoiluong,
                          director:dataphim.dao_dien,
                          actor:dataphim.dien_vien,
                          content:dataphim.tom_tat,
                          finish:dataphim.ngay_ketthuc,
                          theloai:dataphim.theloai,
                          suatchieu:dataphim.suatchieu
                      }
                  )
              }))
          }
      ).catch(error => console.log(error))
    },[])
  
    listphim.forEach(xulyphim);
    return(
        <Box>
            <Stack minH='640px' color='white' bgColor='#1F1D36'  px={50} py={18}>
           
                <Box>
                <Breadcrumb spacing='8px' separator={<Text fontSize={'32px'}><ChevronRightIcon /></Text>}>
                    <BreadcrumbItem  >
                        <BreadcrumbLink href='#'>
                            <Icon pt='6px' as={FaHome}  fontSize='32px' />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'><Heading fontSize='24px'>Phim</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'><Heading fontSize='24px'>Phim Sắp Chiếu</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <hr/>
                <Flex mt='30px' mb='5px'>
                <Heading fontSize='34px'>PHIM SẮP CHIẾU</Heading>
                <Spacer/>
                <Link to='/home/movies/now-showing'><Text mt='10px' color='gray' fontSize='27px'>PHIM ĐANG CHIẾU</Text></Link>
                </Flex>
                <hr/>
                <Box mt='30px'>
                {listphimsapchieu.length===0?'Hiện tại chưa cập nhật phim!':
                <FilmListUpcoming data={listphimsapchieu}/>}
                
                </Box>
                
                </Box>

            </Stack>
        </Box>
    )
}

export default ComingSoon