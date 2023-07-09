import React, { useEffect, useState } from 'react';
import { Box, Button,  Input, Text, useToast} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('user-info')){
          navigate("/home")
      }
    })
    const toast= useToast()
    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(FaEyeSlash);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleToggle=()=>{
        if(type==='password'){
          setIcon(FaEye);
          setType('text');
        }
        else{
          setIcon(FaEyeSlash);
          setType('password');
        }
    }

    async function login(){
      if(email ==="" || password===""){
        toast({
          title: 'Warning!',
          description: "Hãy nhập đủ thông tin!",
          status: 'warning',
          duration: 2000,
          isClosable: true,
       })
      }
      else{
      let item = {"email": email, "password": password}
      axios.post("http://localhost:8000/api/login",item,
        {
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          }
        }
      ).then(res => {
        console.log(res.data.data)
        localStorage.setItem('user-info',JSON.stringify(res.data.data))
        navigate("/home")
      }).catch(error=>{
        console.log(error)
        toast({
          title: 'Error!',
          description: "Email, tên tài khoản hoặc mật khẩu không đúng!",
          status: 'error',
          duration: 2000,
          isClosable: true,
       })
      })}
    }

    return (
      <Box bgColor='#00051D' w='600px' h='525px' 
      boxShadow='10px 10px 10px #7c76ad'
      margin='100px 0px 0px 80px' borderRadius='10px'
      padding='10px' overflow='hidden'>
        <Text color='white' fontWeight='bold' fontSize='3xl'
      textAlign='center' marginTop='20px'
        >ĐĂNG NHẬP</Text>

        <Text color='white'marginTop='20px' marginLeft='60px'>Email hoặc Tên tài khoản</Text>

        <Input
          type='email'
          placeholder='Nhập Email hoặc Tên tài khoản'
          color="white"
          outline={"2px"}
          focusBorderColor='white'
          borderColor='#42C2FF'
          outlineColor='#42C2FF'
          borderRadius="10px"
          border="2px"
          w="460px"
          h="50px"
          margin='20px 0px 20px 60px'
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />
      <Text color='white' marginLeft='60px'>Mật khẩu</Text>
      
      <Box   margin='20px 0px 20px 60px'>
      <Input 
        type={type}
        placeholder='Nhập mật khẩu'
        color="white"
        focusBorderColor='white'
        borderColor='#42C2FF'
        border="2px"
        borderLeftRadius='10px'
        w="460px"
        h="50px"
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        /><span style={{position:'relative', bottom:'35px',
          left:'425px', color:'#42C2FF', cursor:'pointer'}} onClick={handleToggle}>{icon}</span></Box>
  
      <Button 
        bgColor='#42C2FF'
        colorScheme='blue'
        color='white'
        size='lg'
        borderRadius="10px"
        w="460px"
        h="50px"
        margin='10px 0px 20px 60px'
        onClick={login}
      >Đăng nhập</Button>

    <Text color='white' textAlign='center'>Chưa có tài khoản? 
    <span> <Link to='/signup'> 
              <Button color='#42C2FF' variant='link'>
                  Đăng ký!
            </Button>
    </Link></span></Text>
    </Box>
    );
}




export default LoginForm;