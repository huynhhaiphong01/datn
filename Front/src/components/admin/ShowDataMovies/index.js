import React, { useEffect, useState } from 'react';
import { Box,  Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Spacer,
    Divider,
    Flex,
    InputGroup,
    InputLeftElement,
    Input} from '@chakra-ui/react'
    
import DialogAddMovie from '../DialogAddMovie';
import ViewMovieInFo from '../ViewMovieInfo';
import axios from 'axios';
import DialogUpdateMovie from '../DialogUpdateMovie';
import DialogDeleteMovie from '../DialogDeleteMovie';
import {BsSearch} from 'react-icons/bs'

const ShowDataMovies=(props) => {
  const [search, setSearch]= useState("")
  const [listTheloai, setListTheloai] = useState([])
  const [listphim, setListphim] = useState([])
  const listCategory=[]
  const [message,setMessage]= useState('')
  const callbackFunction = (childData) => {
    setMessage(childData)
  }
  function xulytheloai(item, index, arr){
    listCategory.push(arr[index])
}

if(message==='Update' || message===""){ 
  axios.get('http://localhost:8000/api/phims/').
  then(
      res => {
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
                      theloai:dataphim.theloai
                  }
              )
          }))
      }
  ).catch(error => console.log(error))
  props.parentCallback(message)
  setMessage('wait update')
    }
  useEffect( ()=> {
    axios.get('http://localhost:8000/api/theloais/').
    then(
        res => {
            console.log(res.data)
            setListTheloai(res.data.map((datatheloai)=>{
                return(
                    {
                        id: datatheloai.id,
                        ten_the_loai: datatheloai.ten_the_loai,
                    }
                )
            }
            ))
        }
    ).catch(error => console.log(error))
   }, [])
   
        listTheloai.forEach(xulytheloai)
        const renderTableData=listphim.filter(val=>{
          if(search===""){return val}
          else if(val.title.toLowerCase().includes(search.toLocaleLowerCase())){
            return val
          }
        }).map((phim, index) => {
            const { id, title } = phim
            return (
              <Tr key={id}>
                <Td >{index+1}</Td>
                <Td >{title}</Td>
                <Td ><ViewMovieInFo data={phim}/></Td>
                <Td isNumeric> <DialogUpdateMovie parentCallback={callbackFunction}
                 dataphim={listphim[index]}
                 datatheloai={listCategory}/>
                    <DialogDeleteMovie parentCallback={callbackFunction} 
                    tenPhim={title} idPhim={id}/></Td>
              </Tr>
            )
          })
        
        return (
            <Box >
                <Flex w='100%' h='9%' mb='1.5%' alignItems='center'>
                <Heading fontSize='6vh'textShadow='2px 3px 4px #000'>Danh sách phim</Heading>
                <Spacer/>
                <DialogAddMovie parentCallback={callbackFunction} data={listCategory}/>
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
                    placeholder='Tìm kiếm phim...'
                 />
                 </InputGroup>

                </Flex>
                <TableContainer    w='100%' 
                boxShadow='0px 3px 3px 3px rgb(131, 131, 131)'
               >
                 <Table  variant={'striped'} >
                     <Thead bgColor={'#1F1D36'} >
                       <Tr >
                         <Th  color={'white'}>STT</Th>
                         <Th  color={'white'}>Tên phim</Th>
                         <Th  color={'white'}>Chi tiết</Th>
                         <Th  isNumeric  color={'white'}>Action
                         </Th>
                       </Tr>
                    </Thead>
                    
                    <Tbody >
                     {renderTableData}
                    </Tbody>
              
                    
                 </Table>
               </TableContainer>
          </Box>
        );
}


export default ShowDataMovies;