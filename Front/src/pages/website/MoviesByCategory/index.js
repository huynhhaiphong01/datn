import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink,Heading, Icon, Stack, Text } from "@chakra-ui/react";
import React, {  useEffect, useState } from "react";
import {FaHome} from 'react-icons/fa';
import {  useParams } from "react-router-dom";
import ListMoviesByCategory from "../../../components/website/ListMoviesByCategory";
import axios from "axios";

function MoviesByCategory(){
   const [listphim, setListphim] = useState([])
   const [theloai,setTheLoai]=useState("")
   const params=useParams()
   useEffect(()=>{
    axios.get(`http://localhost:8000/api/findtheloai/${params.id}`).
        then(
            res => {
                console.log(res.data)
                setTheLoai(res.data.ten_the_loai)
                setListphim(res.data.phim.map((dataphim)=>{
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
    }, [params])
console.log(listphim)
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
                        <BreadcrumbLink href='#'><Heading fontSize='24px'>Thể loại</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'><Heading fontSize='24px'>{theloai}</Heading></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <hr/>
               
                <Box mt='30px'>
                {listphim.length===0?'Hiện tại chưa cập nhật phim!':
                <ListMoviesByCategory data={listphim}/>}
                </Box>
                
                </Box>

            </Stack>
        </Box>
    )
}

export default MoviesByCategory