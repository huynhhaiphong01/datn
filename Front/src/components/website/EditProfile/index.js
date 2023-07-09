import React, { useEffect } from 'react';
import { Box, Button,  Flex,  Input, Radio, RadioGroup, Stack, Text, toast} from '@chakra-ui/react'
import axios from 'axios';


function EditProfile() {
        const [realname, setRealname] = React.useState(String(JSON.parse(localStorage.getItem('user-info')).realname))
        const [phone_number, setPhone_number] = React.useState(String(JSON.parse(localStorage.getItem('user-info')).phone_number))
        const [birth, setBirth] = React.useState(String(JSON.parse(localStorage.getItem('user-info')).birth))
        const [email, setEmail] = React.useState(String(JSON.parse(localStorage.getItem('user-info')).email))
        const [gender, setGender] = React.useState(String(JSON.parse(localStorage.getItem('user-info')).gender))
        useEffect(()=>{
          console.log(gender)
        },[gender])
        const update = (e) => {
          if(realname === "" || phone_number === "" || birth === "" || email === "" || gender === ""){
            toast({
              title: 'Warning!',
              description: "Hãy nhập đủ thông tin.",
              status: 'warning',
              duration: 2000,
              isClosable: true,
            })
          }
          else{
            const data = {
              realname : realname,
              phone_number : phone_number,
              birth : birth,
              email : email,
              gender : gender,
            }
          axios.put(`http://localhost:8000/api/updateprofile/${JSON.parse(localStorage.getItem('user-info')).id}`, data)
          .then(res => {
            console.log(res.data.data)
            localStorage.setItem('user-info',JSON.stringify(res.data.data))
          }).catch(error=>{
                console.log(error)
          })
          toast({
            title: 'Successfully!',
            description: "Đã cập nhật thành công",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
         }
        }
        return (
          <Box bgColor='white' w='450px' h='500px' 
          boxShadow='10px 10px 10px #7c76ad'
          margin='0px 0px 0px 120px' borderRadius='10px' p='15px 10px 10px 10px'
          >

            <Text  color='black' align='center' fontSize='36px' fontWeight='bold'>
              Sửa thông tin</Text>
            <Text color='black'mt='10px' marginLeft='60px'>Họ và tên</Text>

            <Input
               value={realname}
               type='text'
               color="black"
               placeholder='Nhập họ và tên'
               outline={"2px"}
               focusBorderColor='black'
               borderColor='#42C2FF'
               outlineColor='#42C2FF'
               borderRadius="10px"
               border="2px"
               w="310px"
               h="30px"
               m='10px 0px 10px 60px'
               onChange={(e)=>{
                 setRealname(e.target.value)
               }}
            />

            <Text color='black' marginLeft='60px'>Số điện thoại</Text>
            <Input 
            value={phone_number}
             type='number'
             color="black"
             placeholder='Nhập Số điện thoại'
             outline="2px"
             focusBorderColor='black'
             borderColor='#42C2FF'
             errorBorderColor="#42C2FF"
             border="2px"
             borderRadius="10px"
             w="310px"
             h="30px"
             margin='10px 0px 10px 60px'
             onChange={(e)=>{
              setPhone_number(e.target.value)
            }}
            />
            <Text color='black' marginLeft='60px'>Email</Text>
            <Input 
             value={email}
             type='email'
             color="black"
             placeholder='Nhập Email'
             outline="2px"
             focusBorderColor='black'
             borderColor='#42C2FF'
             errorBorderColor="#42C2FF"
             border="2px"
             borderRadius="10px"
             w="310px"
             h="30px"
             margin='10px 0px 10px 60px'
             onChange={(e)=>{
              setEmail(e.target.value)
            }}
            />
            <Text color='black' marginLeft='60px'>Ngày sinh</Text>
            <Input  
             type='date'
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
             value={birth}
             onChange={(e)=>{
              setBirth(e.target.value)
            }}
            />

            <Flex marginLeft='60px'>
            <Text color='black' >Giới tính</Text>
            <RadioGroup defaultValue={gender}
                        onChange={(e)=>{
                          setGender(e)
                        }}
                      margin='0px 0px 0px 40px' color='black'>
               <Stack direction='row'>
                <Radio value='0' marginRight='20px' borderColor='#42C2FF' >Nam</Radio>
                <Radio value='1'  borderColor='#42C2FF' >Nữ</Radio>
               </Stack>
            </RadioGroup>
            </Flex>
            
                  
          <Button 
            colorScheme='blue'
            bgColor='#42C2FF'
            color='white'
            size='lg'
            borderRadius="10px"
            w="245px"
            h="35px"
            margin='10px 0px 20px 92px'
            onClick={update}
          >Lưu</Button>

        </Box>
        );
}


EditProfile.propTypes = {

};

export default EditProfile;