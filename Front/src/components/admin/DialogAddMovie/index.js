import React, { useEffect, useState } from 'react';
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
import {MdOutlineAdd} from 'react-icons/md'

function DialogAddMovie(props){
    const toast=useToast()
    const [Theloai,setTheloai]=useState([])
    useEffect(()=>{
      console.log(Theloai)
    },[Theloai])
    const SelectCategory = val => {
      setTheloai(val)
      console.log(Theloai)
    }
    const [title, setTitle] = useState("")
    const [trailer, setTrailer] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [time, setTime] = useState("")
    const [length, setLength] = useState("")
    const [director, setDirector] = useState("")
    const [actor, setActor] = useState("")
    const [content, setContent] = useState("")
    const [finish, setFinish] = useState("")

    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const category=props.data;

    const handleSubmit = (e) => {
      if(title==="" || trailer==="" || imageUrl==="" || !Theloai.length ||
      length==="" || director==="" || actor==="" || content==="" || thumbnail===""){
        e.preventDefault();
        const a=[]
        function xulyTheloai(item,index,arr){
            a.push(arr[index].id)
       }
       Theloai.forEach(xulyTheloai)
       console.log(a)
       console.log(imageUrl)
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
      formData.append('ngay_chieu', time)
      formData.append('thoiluong', length)
      formData.append('dao_dien', director)
      formData.append('dien_vien', actor)
      formData.append('tom_tat', content)
      formData.append('ngay_ketthuc', finish)
      formData.append('thumbnail', thumbnail)
      const inputTheloai = []
      function xulyTheloai(item,index,arr){
        // phim.theloai.push(arr[index].id)
        inputTheloai.push(arr[index].id)
      }
      Theloai.forEach(xulyTheloai)
      formData.append('theloai', JSON.stringify(inputTheloai))
      axios.post('http://localhost:8000/api/addphims', formData,
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
        // description: "Đã thêm phim mới "+values.title+".",
        description: "Đã thêm phim mới "+title+".",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      props.parentCallback("Update")
     setTitle("")
     setActor("")
     setTrailer("")
     setImageUrl("")
     setThumbnail("")
     setTime("")
     setLength("")
     setDirector("")
     setContent("")
     setFinish("")
    }
    }

    return(
    <>
      {
      (JSON.parse(localStorage.getItem('user-info')).action.includes("AddMovie"))
        ?
        <Button  leftIcon={<MdOutlineAdd/>}  
        colorScheme='green' size='md'
          shadow='0px 3px 3px 3px #344a3b' onClick={onOpen}>Thêm mới</Button>
        :
        <Button leftIcon={<MdOutlineAdd/>} 
        colorScheme='green' size='md'
          shadow='0px 3px 3px 3px #344a3b' disabled onClick={onOpen}>Thêm mới</Button>
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
                Thêm phim
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
                    options={category} showCheckbox='true' displayValue="ten_the_loai"
                    onSelect={SelectCategory}
                    onRemove={SelectCategory}
                    avoidHighlightFirstOption='true'
                    style={ {chips: { background: "#42C2FF" },
                    searchBox: {color:"white", border: "2px solid #42C2FF",  "borderRadius": "10px",
                  height: '45px'}} }
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
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập tên đạo diễn'
                    value={thumbnail}
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
                <Button type='submit' colorScheme='green' ml={3}>
                  Thêm
                </Button>
              </AlertDialogFooter>
              </form>
          </AlertDialogContent>

        </AlertDialogOverlay>
      </AlertDialog>
   </>
    )
}



export default DialogAddMovie;