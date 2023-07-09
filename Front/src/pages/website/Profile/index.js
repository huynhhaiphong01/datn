import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Center, Flex, HStack, Image,Input,Spacer,Text, useToast} from '@chakra-ui/react'
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Outlet, Link, useNavigate } from "react-router-dom";
import Footer from '../../../components/website/Footer';
import axios from 'axios';


function Profile() {
    const inputFile = useRef()
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const [avatar, setAvatar] = useState("http://localhost:8000/"+JSON.parse(localStorage.getItem("user-info")).avatar)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/")
    }
    const reset = () => {
      inputFile.current.value = ""
      setFile("")
    }
    useEffect(()=>{
      console.log(file)
    },[file])
    const imageHandler = (e) => {
      setFile(e.target.files[0])
      const reader = new FileReader()
      reader.onload = () => {
        if(reader.readyState === 2) {
          setPreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }

    useEffect(()=>{
      console.log({avatar})
    },[avatar])
    async function uploadimg(){
      const formData = new FormData()
      formData.append('avatar', file)
      console.log(formData)
      axios.post(`http://localhost:8000/api/uploadavatar/${JSON.parse(localStorage.getItem('user-info')).id}`,formData,
      {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      }
      ).then(res => {
        console.log(res.data.data)
        localStorage.setItem('user-info',JSON.stringify(res.data.data))
        setAvatar("http://localhost:8000/"+res.data.data.avatar)
        inputFile.current.value = ""
        setFile("")
      }).catch(error=>{
        console.log(error)
      })
      inputFile.current.value = ""
      setFile("")
      window.location.reload(false)
    }
    return (
      <Box>
          <HStack bgColor='#00051D' h='80px' padding='10px' pr='50px'>
              <Box w='500px' h='75px' ml='50px'>
                <Link to='/home'>
                  <Flex>  
                      <Box>
                          <Image
                              borderRadius='full'
                              boxSize='80px'
                              src={require('../../../imgs/Logo.png')}
                              alt='Logo'
                          />
                      </Box>
                      <Center h ='75px'>
                          <Box ml='11px' color='white' fontFamily='Poppins' fontSize='36px' fontWeight='bold.400'>
                              CINEMA PRO MAX
                          </Box>
                      </Center>
                  </Flex>
                  </Link>
              </Box>
              <Spacer/>
          <Link to="/home">
            <Button mr='20px'  color='white' variant='link'>
                  Trang chủ
            </Button>
          </Link>
            <Button color='white' variant='link' 
              onClick={logout}
            >
                  Đăng xuất
            </Button>

        </HStack>
          <Center bgColor='#1F1D36' w='100%' h='655px' 
              display='flex'>
        
            <Box bgColor='#00051D' w='280px' h='500px' 
              boxShadow='10px 10px 10px #7c76ad'
              borderRadius='10px'
              >
              <Box w='280px' h='250px'>
                {
                  file
                  ?
                  <Image border='2px' borderColor='#42C2FF' borderRadius='50%'
                    src={preview} h='150px' w='150px' marginTop='30px'
                    marginLeft='65px'/>
                  :
                  <Image border='2px' borderColor='#42C2FF' borderRadius='50%'
                  src={(JSON.parse(localStorage.getItem('user-info')).avatar)?avatar:
                require('../../../imgs/default_avatar.png')} h='150px' w='150px' marginTop='30px'
                  marginLeft='65px'/>
                }
                {/* upload avatar */}
                <Flex>
                <Box ml="60px" boxSize="24px" pos="relative" overflow="hidden" cursor="pointer">
                  <EditIcon as='label' boxSize="24px" pos="absolute" cursor="pointer" color="white"/>
                  <Input boxSize="24px" opacity={0} type='file' id='avatar' pos="absolute"
                    ref={inputFile}
                    onChange={imageHandler}
                  />
                </Box>
                  {
                      file
                      ?
                      <Flex>
                        <Center>
                          <Button ml="70px" boxSize="24px" pos="relative" color="green.400" overflow="hidden" colorScheme="none"
                            onClick={uploadimg}
                          >
                            <CheckIcon boxSize="24px"/>
                          </Button>
                          <Button boxSize="18px" pos="relative" overflow="hidden" color="red.500" colorScheme="none"
                            onClick={reset}
                          >
                            <CloseIcon boxSize="24px"/>
                          </Button>
                        </Center>
                      </Flex>
                      :
                      ""
                  }
                </Flex>
                <Text color='white' fontFamily='Poppins' fontSize='16px' align='center' mt='10px'
                  textDecoration='underline'>
                  {JSON.parse(localStorage.getItem("user-info")).email}</Text>
                  <Text color='white' fontFamily='Poppins' fontSize='20px' align='center'
                  >
                  {JSON.parse(localStorage.getItem("user-info")).name}</Text>
              </Box>
              <hr/>
                <Box w='280px' h='250px' fontFamily='Poppins'>
                  <Link to='viewprofile'>
                    <Text color='white' align='center' fontSize='24px'
                      mt='9px' mb='9px'>Xem thông tin</Text>
                  </Link> 
                  <hr/>
                  <Link to='editprofile'>
                    <Text color='white' align='center' fontSize='24px'
                      mt='9px' mb='9px'>Sửa thông tin</Text>
                  </Link>  
                  <hr/>
                  <Link to='MyTickets'>
                    <Text color='white' align='center' fontSize='24px'
                      mt='9px' mb='9px'>Vé của tôi</Text>
                  </Link>  
                  <hr/>
                  <Link to='ChangePassword'>
                    <Text color='white' align='center' fontSize='24px'
                      mt='9px' >Đổi mật khẩu</Text>
                  </Link>  
                </Box>
              </Box>

              <Box>
                  <Outlet/>
              </Box>

          </Center>
          <Footer/>
        </Box>
    );
}


Profile.propTypes = {

};

export default Profile;