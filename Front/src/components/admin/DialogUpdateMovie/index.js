import React, { useState } from 'react';
import {Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Input,
    Text,
    Flex,
    Center,
    Box,
    Textarea,
    useToast,
  } from '@chakra-ui/react'
  import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';

function DialogUpdateMovie(props){
    const toast=useToast()
    const [Theloai,setTheloai]=useState(props.dataphim.theloai)
    const SelectCategory = val => {
      setTheloai(val)
      console.log(Theloai)
    }
 

    const [title, setTitle] = useState(props.dataphim.title)
    const [trailer, setTrailer] = useState(props.dataphim.trailer)
    const [imageUrl, setImageUrl] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [time, setTime] = useState(props.dataphim.time)
    const [length, setLength] = useState(props.dataphim.length)
    const [director, setDirector] = useState(props.dataphim.director)
    const [actor, setActor] = useState(props.dataphim.actor)
    const [content, setContent] = useState(props.dataphim.content)
    const [finish, setFinish] = useState(props.dataphim.finish)

    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const category=props.datatheloai;

    const handleSubmit = (e) => {
      if(title==="" || trailer==="" || imageUrl==="" || !Theloai.length ||
      length==="" || director==="" || actor==="" || content==="" || thumbnail==="" ){
        e.preventDefault();
        const a=[]
        function xulyTheloai(item,index,arr){
            a.push(arr[index].id)
       }
       Theloai.forEach(xulyTheloai)
       console.log(a)
        toast({
          title: 'Warning!',
          description: "Hãy nhập đủ thông tin.",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else{
      e.preventDefault();
      const formData = new FormData()
      formData.append('ten', title)
      formData.append('trailer', trailer)
      formData.append('poster', imageUrl)
      formData.append('thoiluong', length)
      formData.append('dao_dien', director)
      formData.append('dien_vien', actor)
      formData.append('tom_tat', content)
      formData.append('thumbnail', thumbnail)
      if(time){
        formData.append('ngay_chieu', time)
      }
      if(finish){
        formData.append('ngay_ketthuc', finish)
      }
      const inputTheloai = []
    
      function xulyTheloai(item,index,arr){
        inputTheloai.push(arr[index].id)
      }
      if(imageUrl!==""){
        Theloai.forEach(xulyTheloai)
        formData.append('theloai', JSON.stringify(inputTheloai))
      }
      
      console.log(JSON.stringify(inputTheloai))
      console.log(formData)
      console.log(imageUrl)
      
      axios.post(`http://localhost:8000/api/updatephim/${props.dataphim.id}`, formData,
        {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        }
      ).then(res => {
        console.log(res.data)
      }).catch(error=>{
            console.log(error)
      })
     
      toast({
        title: 'Successfully!',
        description: "Đã sửa phim "+title+".",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      props.parentCallback("Update")
     }
    }

    return(
    <>
      {
        (JSON.parse(localStorage.getItem('user-info')).action.includes("EditMovie"))
        ?
        <Button mr='5px' size='sm' colorScheme='blue' onClick={onOpen}>Sửa</Button>
        :
        <Button mr='5px' size='sm' disabled colorScheme='blue' onClick={onOpen}>Sửa</Button>
      }
       <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='4xl' 
        
        >
          
        <AlertDialogOverlay >
          <AlertDialogContent alignSelf={'center'}  bgColor='#1F1D36' border='2px' borderColor='#42C2FF' 
          >
            <form onSubmit={handleSubmit}>
              <AlertDialogHeader fontSize='2xl' fontWeight='bold'
              color='white' textAlign='center'>
                Sửa phim
              </AlertDialogHeader>

              <AlertDialogBody color='white'>
              
              <Center>
                <Flex>
                <Box mr='35px'>
                  <Box mb='15px'>
                    <Text mb='10px'>Tên phim (*)</Text>
                    <Input w='360px' h='45px' type='text' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập tên phim' 
                    value={title}
                    onChange={(e)=>{
                      setTitle(e.target.value)
                            console.log(Theloai)
                            }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px'>Thời lượng (*)</Text>
                    <Input w='360px' h='45px' type='number' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập thời lượng phim'
                    value={length}
                    onChange={(e)=>{
                      setLength(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px'>Trailer (*)</Text>
                    <Input w='360px' h='45px' type='url'
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập url'
                    value={trailer}
                    onChange={(e)=>{
                      setTrailer(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px'>Đạo diễn (*)</Text>
                    <Input w='360px' h='45px' type='text' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập tên đạo diễn'
                    value={director}
                    onChange={(e)=>{
                      setDirector(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px'>Diễn viên (*) </Text>
                    <Input w='360px' h='45px' type='text' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập tên các diễn viên'
                    value={actor}
                    onChange={(e)=>{
                      setActor(e.target.value)
                    }}
                    />
                  </Box>

                  <Box >
                    <Text mb='10px'>Thể loại (*)</Text>
                    <Multiselect className='mse-category' 
                    placeholder='Chọn thể loại' hidePlaceholder='true'
                    selectedValues={Theloai}
                    options={category} showCheckbox='true' displayValue="ten_the_loai"
                    onSelect={SelectCategory}
                    onRemove={SelectCategory}
                    avoidHighlightFirstOption='true'
                    style={ {chips: { background: "#42C2FF" },
                    searchBox: {color:"white", border: "2px solid #42C2FF",  "borderRadius": "10px",
                  height: "45px"}} }
                    />
                  </Box>
                  </Box>
                  <Box>
                 

                  <Box mb='15px'>
                    <Text mb='10px'>Ngày bắt đầu chiếu</Text>
                    <Input w='360px' h='45px' type='date'
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    value={time}
                    onChange={(e)=>{
                      setTime(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px' >Ngày kết thúc dự kiến</Text>
                    <Input w='360px' h='45px' type='date'
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    value={finish}
                    onChange={(e)=>{
                      setFinish(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px'>Poster Phim (*)</Text>
                    <Input w='360px' h='45px' type='file' 
                    focusBorderColor='white'
                    placeholder='Nhập link poster'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    onChange={(e)=>{
                      setImageUrl(e.target.files[0])
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px'>Thumbnail (*)</Text>
                    <Input w='360px' h='45px' type='file' 
                    focusBorderColor='white'
                    placeholder='Nhập link thumbnail'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    onChange={(e)=>{
                      setThumbnail(e.target.files[0])
                    }}
                    />
                  </Box>

                  <Box>
                    <Text mb='10px'>Nội dung (*)</Text>
                    <Textarea w='360px'  type='text' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập nội dung phim'
                    value={content}
                    onChange={(e)=>{
                      setContent(e.target.value)
                    }}
                    />
                  </Box>
                </Box>
                </Flex>
                </Center>
                
              </AlertDialogBody>
             
              <AlertDialogFooter>
                <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                  Hủy
                </Button>
                <Button type='submit' colorScheme='green' ml={3} onClick={onClose}>
                  Sửa
                </Button>
              </AlertDialogFooter>
              </form>
          </AlertDialogContent>

        </AlertDialogOverlay>
      </AlertDialog>
   </>
    )
}



export default DialogUpdateMovie;