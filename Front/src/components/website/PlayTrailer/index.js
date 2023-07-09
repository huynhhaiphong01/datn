import {Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    IconButton,
    useDisclosure, AspectRatio, Center
    } from '@chakra-ui/react';
import React from 'react';
import {GrPlayFill} from 'react-icons/gr'


function PlayTrailer(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
    <>
    
    <IconButton style={props.styleProp} onClick={onOpen} borderRadius='50%' icon={<GrPlayFill/>}
                    transition='0.7s'  bgColor='white' mr='10px'/>
        
      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay/>
        <ModalContent alignSelf='center' bgColor='white' w='660px' h='410px' 
         color='white'>
      
      
            <Center>
           <AspectRatio w='650px' h='400px' mt='5px' ratio={1}>
             <iframe 
              title=''
              src={props.trailerProp}
              allowFullScreen
             />
           </AspectRatio></Center>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
    )
}

export default PlayTrailer;