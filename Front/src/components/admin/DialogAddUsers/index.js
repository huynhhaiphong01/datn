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
    useToast,
    Radio,
    RadioGroup,
    Stack,
  } from '@chakra-ui/react'
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {MdOutlineAdd} from 'react-icons/md'

function DialogAddUsers(props){
    const toast=useToast()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [realname, setRealname] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [gender, setGender] = useState("0")
    const [birth, setBirth] = useState("")
    const [type1, setType1]=useState('password');
    const [type2, setType2]=useState('password');
    const [icon1, setIcon1]=useState(FaEyeSlash);
    const [icon2, setIcon2]=useState(FaEyeSlash);
    console.log(gender)

    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleToggle1=()=>{
      if(type1==='password'){
         setIcon1(FaEye);
         setType1('text');
         }
      else{
         setIcon1(FaEyeSlash);
         setType1('password');
         }
   }

   const handleToggle2=()=>{
      if(type2==='password'){
         setIcon2(FaEye);
         setType2('text');
         }
      else{
         setIcon2(FaEyeSlash);
         setType2('password');
         }
   }

    const handleSubmit = (e) => {
      if(name==="" || realname==="" || phone_number==="" || birth===""||
      email==="" || password==="" || password2==="" ){
        e.preventDefault();
        toast({
          title: 'Warning!',
          description: "Hãy nhập đủ thông tin.",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
      else if(password !== password2){
        e.preventDefault();
        toast({
           title: 'Warning!',
           description: "Hãy xác nhận mật khẩu chính xác.",
           status: 'warning',
           duration: 2000,
           isClosable: true,
        })
     }
      else{
      e.preventDefault();
      let item = {
        "name": name ,
        "email": email,
        "password": password,
        "realname": realname,
        "phone_number": phone_number,
        "gender": gender,
        "birth": birth
     }
     console.log(item)
     
     axios.post("http://localhost:8000/api/register",item,
        {
           headers: {
           "Content-Type" : "application/json",
           "Accept" : "application/json"
           }
        }
     ).then(res => {
        toast({
           title: 'Successfully!',
           description: "Đã thêm mới tài khoản.",
           status: 'success',
           duration: 2000,
           isClosable: true,
        })
     }).catch(error=>{
           console.log(error)
           console.log(item)
           toast({
              title: 'Warning!',
              description: "Email hoặc tên tài khoản đã được sử dụng",
              status: 'warning',
              duration: 2000,
              isClosable: true,
           })
     })
      props.parentCallback("Update")
      setEmail("")
      setBirth("")
      setGender("0")
      setName("")
      setPassword("")
      setPassword2("")
      setPhone_number("")
      setRealname("")
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
        <Button  leftIcon={<MdOutlineAdd/>} 
        colorScheme='green' size='md' 
          shadow='0px 3px 3px 3px #344a3b' disabled onClick={onOpen}>Thêm mới</Button>
      }
       
       <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='3xl' 
        
        >
          
        <AlertDialogOverlay >
          <AlertDialogContent alignSelf={'center'}  bgColor='#1F1D36' border='2px' borderColor='#42C2FF' 
          >
            <form onSubmit={handleSubmit}>
              <AlertDialogHeader fontSize='2xl' fontWeight='bold'
              color='white' textAlign='center'>
                Thêm tài khoản
              </AlertDialogHeader>

              <AlertDialogBody color='white'>
              
              <Center>
                <Flex>
                <Box mr='45px'>
                  <Box mb='15px'>
                    <Text mb='10px' userSelect={'none'}>Tên tài khoản</Text>
                    <Input w='360px' h='45px' type='text' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập tên tài khoản' 
                    value={name}
                    onChange={(e)=>{
                      setName(e.target.value)
                            }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px' userSelect={'none'}>Họ và tên</Text>
                    <Input w='360px' h='45px' type='text' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập họ và tên'
                    value={realname}
                    onChange={(e)=>{
                      setRealname(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px' userSelect={'none'}>Số điện thoại</Text>
                    <Input w='360px' h='45px' type='number'
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập số điện thoại'
                    value={phone_number}
                    onChange={(e)=>{
                      setPhone_number(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px' userSelect={'none'}>Email</Text>
                    <Input w='360px' h='45px' type='email' 
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập Email'
                    value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value)
                    }}
                    />
                  </Box>

                  </Box>
                  <Box>
                  <Box mb='15px' >
                    <Text mb='10px' userSelect={'none'}>Mật khẩu</Text>
                    <Input w='360px' h='45px' type={type1}
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập mật khẩu'
                    value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }}
                    />
                    <Box onClick={handleToggle1} cursor='pointer' color='#42C2FF'
                    position='relative' bottom={'30px'} left='330px'>{icon1}</Box>
                  </Box>


                  <Box mb='15px'>
                    <Text userSelect={'none'} mb='10px'>Xác nhận mật khẩu</Text>
                    <Input w='360px' h='45px' type={type2}
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    placeholder='Nhập mật khẩu xác nhận'
                    value={password2}
                    onChange={(e)=>{
                      setPassword2(e.target.value)
                    }}
                    />
                     <Box onClick={handleToggle2} cursor='pointer' color='#42C2FF'
                    position='relative' bottom={'30px'} left='330px'>{icon2}</Box>
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px' userSelect={'none'}>Ngày sinh</Text>
                    <Input w='360px' h='45px' type='date'
                    focusBorderColor='white'
                    border='2px'
                    borderRadius='10px'
                    borderColor='#42C2FF'
                    value={birth}
                    onChange={(e)=>{
                      setBirth(e.target.value)
                    }}
                    />
                  </Box>

                  <Box mb='15px'>
                    <Text mb='10px' userSelect={'none'}>Giới tính</Text>
                    <RadioGroup            
                      onChange={setGender} 
                      value={gender} color='white'>
                    <Stack direction='row'>
                      <Radio value="0" marginRight='70px' colorScheme='#42C2FF'
                      borderColor='#42C2FF'>Nam</Radio>
                      <Radio value="1" colorScheme='#42C2FF'  
                      borderColor='#42C2FF'>Nữ</Radio>
                    </Stack>
                    </RadioGroup>
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



export default DialogAddUsers;