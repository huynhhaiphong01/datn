import {Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Button,
    useDisclosure, AspectRatio, Center
    } from '@chakra-ui/react';
import React from 'react';


function WatchTrailer(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
    <>
    
    <Button onClick={onOpen} fontSize='24px' h='63px' w='164px' colorScheme='red'>Xem Trailer</Button>
        
      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay/>
        <ModalContent alignSelf='center' bgColor='white' w='660px' h='410px' 
         color='white'>
            <Center>
           <AspectRatio w='650px' h='400px'mt='5px' ratio={1}>
             <iframe
              title='The Batman'
              src={props.trailer}
              allowFullScreen
             />
           </AspectRatio></Center>
           <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
    )
}

export default WatchTrailer;