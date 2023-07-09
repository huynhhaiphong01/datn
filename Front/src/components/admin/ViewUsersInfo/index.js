import { Image,Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Flex,
    Box,
    Text,
    Center,} from '@chakra-ui/react';
import React from 'react';
import moment from 'moment'


function ViewUsersInFo(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
    <>
    
    <IconButton onClick={onOpen}  colorScheme='white'
     icon={<Image h='40px' w='42px' src={require('../../../imgs/view.png')}/>}/>
        
      <Modal isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay />
        <ModalContent alignSelf='center' h='600px' mt='10px'
        color='white' bgColor='#1F1D36'>
            {props.data.avatar?
            <Image objectFit='cover' opacity='0.6'
            w='480px' h='250px' borderRadius='10px' src={'http://localhost:8000/'+props.data.avatar}/>
             :
             <Image objectFit='cover' opacity='0.6'
             w='480px' h='250px' borderRadius='10px' src={require('../../../imgs/default_avatar.png')}/>}
            
             <Box  position='relative' bottom='120px'>
                 <Center>
                {props.data.avatar?
                <Image  objectFit='cover' w='180px' h='180px'
                    borderRadius='50%' border='2px'
                   borderColor="#42C2FF" src={'http://localhost:8000/'+props.data.avatar}/>
                :
                <Image  objectFit='cover' w='180px' h='180px'
                borderRadius='50%' border='2px'
               borderColor="#42C2FF" src={require('../../../imgs/default_avatar.png')}/>}
               </Center>
               <Text textAlign='center' fontSize='25px' fontWeight='bold'>{props.data.fullname}</Text>
               <Center>
                <Box mb='10px'>
               <Flex  mt='10px'>
                   <Text mr='55px'>Tên tài khoản:</Text>
                   <Text fontWeight='bold'>{props.data.username}</Text>
               </Flex>

               <Flex  mt='10px'>
                   <Text mr='96px'>Giới tính:</Text>
                   <Text fontWeight='bold'>
                       {props.data.gender===0?"Nam":"Nữ"}
                   </Text>
               </Flex>

               <Flex  mt='10px'>
                   <Text mr='82px' >Ngày sinh:</Text>
                   <Text fontWeight='bold'>{moment(props.data.birth).format("DD/MM/YYYY")}</Text>
               </Flex>

               <Flex  mt='10px' >
                   <Text mr='125px'>Email:</Text>
                   <Text fontWeight='bold' maxW='280px'>{props.data.email}</Text>
               </Flex> 

               <Flex  mt='10px' >
                   <Text mr='55px'>Số điện thoại:</Text>
                   <Text fontWeight='bold'>{props.data.phoneNumber}</Text>
               </Flex> 
               </Box>
               </Center>

             </Box>
            
             <ModalCloseButton />
           
        </ModalContent>
      </Modal>
    </>
    )
}

export default ViewUsersInFo;