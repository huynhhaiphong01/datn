import { ChevronRightIcon } from "@chakra-ui/icons";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {FaHome} from 'react-icons/fa';
import { Link } from "react-router-dom";
import FilmList from "../../../components/website/FilmList";

function NowShow(props){
  const listphimdangchieu = []
  const [listphim, setListphim] = useState([])
  function xulyphim(item, index, arr){
      if(Date.parse((arr[index].time)) <= Date.now()){
          listphimdangchieu.push(arr[index])
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
                        <BreadcrumbLink  >
                            <Icon  as={FaHome}  fontSize='32px' />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink ><Heading fontSize='24px'>Phim</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink ><Heading fontSize='24px'>Phim Đang Chiếu</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <hr/>
                <Flex mt='30px' mb='5px'>
                <Heading fontSize='34px'>PHIM ĐANG CHIẾU</Heading>
                <Spacer/>
                <Link to='/home/movies/coming-soon'><Text mt='10px' color='gray' fontSize='27px'>PHIM SẮP CHIẾU</Text></Link>
                </Flex>
                <hr/>
                <Box mt='30px'>
                {listphimdangchieu.length===0?'Hiện tại chưa cập nhật phim!':
                <FilmList data={listphimdangchieu}/>}
                </Box>
                
                </Box>

            </Stack>
        </Box>
    )
}

export default NowShow