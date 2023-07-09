import React, { useState } from 'react';
import { Box, Button,  Checkbox,  Input, Text, useToast} from '@chakra-ui/react'
import axios from 'axios';


function ChangePassword() {
        const toast= useToast()
        const [typeP,setTypeP]=useState("password");
        const [old_password, setOld_password] = useState();
        const [new_password, setNew_password] = useState();
        const [confirm_password, setConfirm_password] = useState();
        const handleToggle=()=>{
          if(typeP==='password'){
            setTypeP('text');
          }
          else{
            setTypeP('password');
          }
        }

        const handleClick = ()=> {
          var data = {
            "user_id": JSON.parse(localStorage.getItem('user-info')).id,
            "old_password" : old_password,
            "new_password" : new_password,
            "confirm_password" : confirm_password,
          }
          axios.post("http://localhost:8000/api/changepassword",data,
          {
            headers: {
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            }
          }
          ).then(res => {
            console.log(res.data)
            localStorage.setItem('user-info',JSON.stringify(res.data))
            toast({
              title: 'Successfully!',
              description: "Đã đổi mật khẩu thành công",
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
            setOld_password("")
            setNew_password("")
            setConfirm_password("")
          }).catch(error=>{
                console.log(error)
                toast({
                  title: 'Warning!',
                  description: "Vui lòng kiểm tra lại thông tin",
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                })
          })
        }

        return (
          <Box bgColor='white' w='450px' h='500px' 
          boxShadow='10px 10px 10px #7c76ad'
          margin='0px 0px 0px 120px' borderRadius='10px' p='30px 10px 10px 10px'
          >

            <Text  color='black' align='center' fontSize='36px' fontWeight='bold'>
              Thay đổi mật khẩu</Text>
            <Text color='black'mt='20px' marginLeft='60px'>Mật khẩu cũ</Text>

            <Input
               type={typeP}
               color="black"
               placeholder='Nhập mật khẩu cũ'
               outline={"2px"}
               focusBorderColor='black'
               borderColor='#42C2FF'
               outlineColor='#42C2FF'
               borderRadius="10px"
               border="2px"
               w="310px"
               h="30px"
               m='10px 0px 10px 60px'
               value={old_password}
               onChange={(e)=>{setOld_password(e.target.value)}}
            />
            <Text color='black' marginLeft='60px'>Mật khẩu mới</Text>
            <Input 
             type={typeP}
             color="black"
             placeholder='Nhập mật khẩu mới'
             outline="2px"
             focusBorderColor='black'
             borderColor='#42C2FF'
             errorBorderColor="#42C2FF"
             border="2px"
             borderRadius="10px"
             w="310px"
             h="30px"
             margin='10px 0px 10px 60px'
             value={new_password}
             onChange={(e)=>{setNew_password(e.target.value)}}
            />
            <Text color='black' marginLeft='60px'>Xác nhận mật khẩu</Text>
            <Input 
             type={typeP}
             placeholder='Nhập mật khẩu xác nhận'
             color="black"
             outline="2px"
             focusBorderColor='black'
             borderColor='#42C2FF'
             errorBorderColor="#42C2FF"
             border="2px"
             borderRadius="10px"
             w="310px"
             h="30px"
             margin='10px 0px 10px 60px'
             value={confirm_password}
             onChange={(e)=>{setConfirm_password(e.target.value)}}
            />
                  
          <Checkbox onChange={handleToggle} margin='10px 0px 10px 60px'>Hiện mật khẩu</Checkbox>
          <Button 
            colorScheme='blue'
            bgColor='#42C2FF'
            color='white'
            size='lg'
            borderRadius="10px"
            w="245px"
            h="35px"
            margin='20px 0px 20px 92px'
            onClick={handleClick}
          >Lưu</Button>
        </Box>
        );
}


ChangePassword.propTypes = {

};

export default ChangePassword;