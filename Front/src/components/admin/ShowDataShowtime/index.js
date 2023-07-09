import React, { useEffect, useState } from 'react';
import { Box,  Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Spacer,
    Text,
    Divider,
    Select,
    Button} from '@chakra-ui/react'
import DialogAddShowtime from '../DialogAddShowtime';
import DialogDeleteShowtime from '../DialogDeleteShowtime';
import {FcHighPriority} from 'react-icons/fc'
import {MdOutlineFilterList} from 'react-icons/md'
import axios from 'axios';
import moment from 'moment';
function ShowDataShowtime(){
    const [listShowtime,setListShowtime]=useState([])
    const [listMovie, setListMovie] = useState([])
    const [listRoom, setListRoom] = useState([])
    const [movieSL,setMovieSL] = useState("-- Chọn phim --")
    useEffect(()=>{console.log(movieSL)},[movieSL])
    const [roomSL, setRoomSL] = useState("-- Chọn phòng chiếu --")
    useEffect(()=>{console.log(roomSL)},[roomSL])
    const [movieFilter,setMovieFilter] = useState("-- Chọn phim --")
    useEffect(()=>{console.log(movieFilter)},[movieFilter])
    const [roomFilter, setRoomFilter] = useState("-- Chọn phòng chiếu --")
    useEffect(()=>{console.log(roomFilter)},[roomFilter])
    const [message,setMessage]= useState('')
    const callbackFunction = (childData) => {
      setMessage(childData)
    }
    if(message==='Update' || message===""){ axios.get('http://localhost:8000/api/suatchieus/').
    then(
        res => {
            setListShowtime(res.data.data.map((dataShowtime)=>{
                return(
                    {
                        id: dataShowtime.id,
                        start: dataShowtime.gio_bat_dau,
                        finish: dataShowtime.gio_ket_thuc,
                        date: dataShowtime.ngay_chieu,
                        idMovie: dataShowtime.phim_id,
                        movie: dataShowtime.phim_name,
                        idRoom: dataShowtime.phongchieu_id,
                        room:dataShowtime.phongchieu_name,
                    }
                )
                  }))}).catch(error => console.log(error))
                setMessage('waiting update')
                }
        useEffect(()=>{
          axios.get('http://localhost:8000/api/phongchieus/').
          then(
              res => {
                  setListRoom(res.data.data.map((dataRoom)=>{
                      return(
                          {
                              id_room: dataRoom.id,
                              room: dataRoom.ten_phong
                          }
                      )
                        }))}).catch(error => console.log(error))
      },[])
  
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
    const handleFilter =()=>{
      setMovieFilter(movieSL)
      setRoomFilter(roomSL)
    }
    const renderTableData=listShowtime.filter(val=>{
      if(movieFilter==="-- Chọn phim --" && roomFilter==="-- Chọn phòng chiếu --"){return val}
      else if(val.movie.toLowerCase().includes(movieFilter.toLocaleLowerCase()) &&
         roomFilter==="-- Chọn phòng chiếu --" ){
        return val
      }
      else if(val.room.toLowerCase().includes(roomFilter.toLocaleLowerCase()) &&
         movieFilter==="-- Chọn phim --" ){
        return val
      }
      else if(val.movie.toLowerCase().includes(movieFilter.toLocaleLowerCase()) &&
          val.room.toLowerCase().includes(roomFilter.toLocaleLowerCase()) ){
        return val
      }
    }).map((showtime, index) => {
        return (
          <Tr key={showtime.id}>
            <Td >{index+1}</Td>
            <Td >
              {Date.parse(showtime.date)>=Date.now()?
              moment(showtime.date).format("DD/MM/YYYY"):
             <Flex alignItems='center'>
              {moment(showtime.date).format("DD/MM/YYYY")} 
              <Box ml='5px'>
               <FcHighPriority/>
              </Box>
              </Flex>}
            </Td>
            <Td >{moment(showtime.start,"h:mm:ss").format("LT")} - 
            {moment(showtime.finish,"h:mm:ss").format("LT")}</Td>
            <Td >{showtime.movie}</Td>
            <Td >{showtime.room}</Td>
            <Td isNumeric> 
        
            <DialogDeleteShowtime parentCallback={callbackFunction} 
                   data={showtime}/>
                   </Td>
          </Tr>
        )
      })
    return(
        <Box >
         <Flex w='100%' h='9%' mb='1.5%' alignItems='center'>
                <Heading  textShadow='2px 3px 4px #000'
                fontSize='6vh'>Danh sách suất chiếu</Heading>
                <Spacer/>
                <DialogAddShowtime parentCallback={callbackFunction}
                  listMovie={listMovie} listRoom={listRoom}/>
              </Flex>
              <Divider bgColor='#1F1D36' h={'3px'} />
              <Flex mt='2%' mb='2%' w='100%' h='9%' justifyContent={'center'} alignItems='center'>  
                  <Text mr='1%' fontSize='17px'>Phim</Text>
                  <Select size={'sm'} w='30%' value={movieSL} 
                  onChange={(e)=>{setMovieSL(e.target.value)}} focusBorderColor='none'
                  shadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                     <option>-- Chọn phim --</option>
                     {listMovie.map(data=>(
                       <option>{data.movie}</option>
                     ))}
                  </Select>

                  <Text mr='1%' ml='3%' fontSize='17px'>Phòng chiếu</Text>
                  <Select size={'sm'} w='30%' value={roomSL} 
                  onChange={(e)=>{setRoomSL(e.target.value)}} focusBorderColor='none'
                  shadow='0px 3px 3px 3px rgb(131, 131, 131)'>
                     <option>-- Chọn phòng chiếu --</option>
                     {listRoom.map(data=>(
                       <option>{data.room}</option>
                     ))}
                  </Select>

                  <Button colorScheme={'blue'} leftIcon={<MdOutlineFilterList/>}
                   shadow='0px 3px 3px 3px #344a3b'
                  size='sm' ml='3%' onClick={handleFilter}>
                    Lọc</Button>
                </Flex>
        <Flex alignItems='center' mb='1%'>
       <Spacer/>
       <Flex alignItems='center'>
           <FcHighPriority/>
           <Text userSelect='none' ml='5px'>Ngày chiếu quá hạn</Text>
       </Flex>
       </Flex>
        <TableContainer  w='100%' 
        boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'>
         <Table variant='striped'>
             <Thead bgColor={'#1F1D36'}>
               <Tr>
                 <Th color='white'>STT</Th>
                 <Th color='white'>Ngày chiếu</Th>
                 <Th color='white'>Thời gian chiếu</Th>
                 <Th color='white'>Phim</Th>
                 <Th color='white'>Phòng chiếu</Th>
                 <Th color='white' isNumeric>Action</Th>
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

export default ShowDataShowtime