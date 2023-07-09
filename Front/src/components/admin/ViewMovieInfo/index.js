import { Image,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Flex,
    Box,
    Heading,
    Divider,
    Text,} from '@chakra-ui/react';
import React from 'react';
import WatchTrailer from '../WatchTrailer';
import moment from 'moment';


function ViewMovieInFo(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgC="linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("
    const bgImg=bgC+"http://localhost:8000/"+props.data.thumbnail+")"
    let tl=""
    function xuliTL(item,index,arr){
         if(index===props.data.theloai.length-1)
         {tl=tl+arr[index].ten_the_loai}
         else {tl=tl+arr[index].ten_the_loai+", "}
    }
    props.data.theloai.forEach(xuliTL)
    return(
    <>
    
    <IconButton onClick={onOpen}  colorScheme='white'
     icon={<Image h='40px' w='42px' src={require('../../../imgs/view.png')}/>}/>
        
      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent mt='10px' border='2px' borderColor='#42C2FF' 
        bg={bgImg}
        backgroundPosition= 'center'
        backgroundRepeat= 'no-repeat'
        backgroundSize= 'cover' color='white'>
          <ModalHeader>Thông tin phim</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex>
                    <Box>
                        <Image objectFit='cover'  w='449px' h='640px' src={"http://localhost:8000/"+props.data.imageUrl}/>
                    </Box>
                    <Box flex={1} ml='55px'>
                        <Heading fontSize='27px'>{props.data.title}</Heading>
                        <Divider mt='24px' mb='24px'/>
                        <Box mb='23px' fontSize='15px'>
                            <Flex>
                                <Text fontWeight='bold'>Đạo diễn: </Text>
                                <Text ml='1'>{props.data.director}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Diễn viên: </Text>
                                <Text ml='1'>{props.data.actor}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Thể loại: </Text>
                                <Text ml='1'>{tl}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Khởi chiếu: </Text>
                                <Text ml='1'>{!props.data.time?"":moment(props.data.time).format("DD/MM/YYYY")}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Thời lượng: </Text>
                                <Text ml='1'>{props.data.length} {props.data.length?'phút':''}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Dự kiến kết thúc: </Text>
                                <Text ml='1'>{!props.data.finish?"":moment(props.data.finish).format("DD/MM/YYYY")}</Text>
                            </Flex>
                        </Box>
                        <WatchTrailer trailer={props.data.trailer}/>
                        <Divider mt='24px' mb='24px'/>
                        <Box>
                            <Heading fontSize='27px' mb='2px'>Tóm tắt nội dung</Heading>
                            <Text fontSize='15px'> {props.data.content}</Text>
                        </Box>
                    </Box>
                </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}

export default ViewMovieInFo;