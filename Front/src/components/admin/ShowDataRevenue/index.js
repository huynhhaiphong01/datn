import React, { useEffect, useState } from 'react';
import {Box, Select, Text,
        Table,
        Thead,
        Tbody,
        Tr,
        Th,
        Td,
        TableContainer
      } from '@chakra-ui/react'
import axios from 'axios';
import moment from 'moment';

function ShowDataRevenue() {
       const [listMovie, setListMovie] = useState([])
       const [listBill, setListBill] = useState([])
       const [movieSL, setMovieSL] = useState("-- Chọn phim --")
       const [total,setTotal]=useState(0)
       const [tickets,setTickets]=useState(0)
       const [showtimes,setShowtimes]=useState(0)
       useEffect(()=>{
         axios.get('http://localhost:8000/api/tonghoadon/').
         then(res=>{
            setTotal(res.data)
         }).catch(error => console.log(error))
       },[total])
       useEffect(()=>{
         axios.get('http://localhost:8000/api/vephims/').
         then(res=>{
            setTickets(res.data.data.length)
         }).catch(error => console.log(error))
       },[total])
       useEffect(()=>{
         axios.get('http://localhost:8000/api/suatchieus/').
         then(res=>{
            setShowtimes(res.data.data.length)
         }).catch(error => console.log(error))
       },[total])
       useEffect(()=>{console.log(movieSL)},[movieSL])
       useEffect(()=>{
         axios.get('http://localhost:8000/api/phims/').
         then(
             res => {
                 setListMovie(res.data.map((dataphim)=>{
                     return(
                         {
                             id_movie: dataphim.id,
                             movie: dataphim.ten,
                         }
                     )
                 }))
             }
         ).catch(error => console.log(error))
     },[])
     useEffect(()=>{
      axios.get('http://localhost:8000/api/hoa_dons/').
      then(
          res => {
              setListBill(res.data.data.map((data)=>{
                  return(
                      {
                          id: data.id,
                          movie: data.ten,
                          price: data.gia,
                          food_drink_bill: data.food_drink_bill,
                          tickets: data.vephim,
                          phim: data.phim
                      }
                  )
              }))
          }
      ).catch(error => console.log(error))
  },[])
   //   function Total(item, index, arr){
   //        setTotal(total+arr[index].price)
   //   }
   //   listBill.forEach(Total)
     const renderTableData=listBill.filter(val=>{
      if(movieSL==="-- Chọn phim --"){return val}
      else if(val.phim.ten_phim.toLowerCase().includes(movieSL.toLocaleLowerCase())){
        return val
      }
    }).map((Bill, index) => {
        return (
          <Tr key={Bill.id}>
            <Td >{index+1}</Td>
            <Td >{Bill.phim.ten_phim}
            </Td>
            <Td >{moment(Bill.phim.suatchieu.gio_bat_dau,"h:mm:ss").format("LT")} - {moment(Bill.phim.suatchieu.gio_ket_thuc,"h:mm:ss").format("LT")}</Td>
            <Td >{Bill.tickets.length}</Td>
            <Td isNumeric>{Bill.price} đ</Td>
          </Tr>
        )
      })
        return (
            <Box >
               <Select  size='sm' w='35%' focusBorderColor='none'
                  shadow='0px 3px 3px 3px rgb(131, 131, 131)' value={movieSL}
                   mt='10px'  onChange={(e)=>{setMovieSL(e.target.value)}}>
                   <option>-- Chọn phim --</option>
                     {listMovie.map(data=>(
                       <option>{data.movie}</option>
                     ))}
               </Select>
               <Box w='1020px' h='180px' display='flex' mt='20px' >
                  <Box w='350px' h='180px' mr='60px' p='10px'
                  borderRadius='10px'  boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                     <Text align='center' color='black'>TỔNG</Text>
                     <Text align='center' mt='30px' fontWeight='black' fontSize='36px' color='black'>
                             {total} đ</Text>
                  </Box>

                  <Box w='300px' h='180px' mr='60px' p='10px'
                  borderRadius='10px'  boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                      <Text align='center' color='black'>SỐ LƯỢNG BÁN</Text>
                      <Text align='center' mt='30px' fontWeight='black' fontSize='36px' color='black'>
                             {tickets} vé</Text>
                  </Box>

                  <Box w='250px' h='180px'  p='10px'
                  borderRadius='10px'  boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                     <Text align='center' color='black'>SỐ SUẤT CHIẾU</Text>
                     <Text align='center' mt='30px' fontWeight='black' fontSize='36px' color='black'>
                             {showtimes}</Text>
                  </Box>
               </Box>
               <TableContainer  mt='3%'  w='100%' boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                 <Table variant='striped' >
                     <Thead  bgColor={'#1F1D36'}>
                       <Tr >
                         <Th color={'white'}>STT</Th>
                         <Th color={'white'}>Phim</Th>
                         <Th color={'white'}>Suất chiếu</Th>
                         <Th color={'white'}>Số vé</Th>
                         <Th isNumeric color={'white'}>Thu</Th>
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


export default ShowDataRevenue;