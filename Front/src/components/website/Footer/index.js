import React from "react";
import { 
    Box, 
    HStack,
    Spacer,
    Flex,
    Link,
    Text,
    Center
} from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaGithub, FaApple, FaGooglePlay, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return(
        <HStack color='white' as='footer' bgColor='#00051D' h='200px'>
            <Spacer/>
            <Box color='white'>
                <Box fontSize='20px'>
                    <Text>
                        INTRODUCE
                    </Text>
                </Box>
                <Box fontSize='16px'>
                    <Link>
                        About Us
                    </Link>
                </Box>
                <Box fontSize='16px'>
                    <Link>
                        Operational Regulations
                    </Link>
                </Box>
                <Box fontSize='16px'>
                    <Link>
                        Usage Agreement
                    </Link>
                </Box>
                <Box fontSize='16px'>
                    <Link>
                        Privacy Policy
                    </Link>
                </Box>
            </Box>
            <Box color='white'>
                <Box ml='164px' fontSize='20px'>
                    <Text>
                        CINEMA CORNER
                    </Text>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Movie Genre
                    </Link>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Movie Commentary
                    </Link>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Movie Blog
                    </Link>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Movie of the Month
                    </Link>
                </Box>
            </Box>
            <Box color='white'>
                <Box ml='164px' fontSize='20px'>
                    <Text>
                        SUPPORT
                    </Text>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Recruit
                    </Link>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Feedback
                    </Link>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Sales & Services
                    </Link>
                </Box>
                <Box ml='164px' fontSize='16px'>
                    <Link>
                        Ticket Price
                    </Link>
                </Box>
            </Box>
            <Box color='white'>
                <Box ml='164px' fontSize='20px'>
                    <Text>
                        CONTACT US
                    </Text>
                </Box>
                <Box ml='164px' fontSize='16px'>
                <Link>
                    <Flex>
                        <Center>
                            <FaFacebook size='24px' color="white"/>
                            <FaTwitter size='24px' color="white"/>
                            <FaInstagram size='24px' color="white"/>
                            <FaYoutube size='24px' color="white"/>
                        </Center>
                    </Flex>
                </Link>
                </Box>
                <Box ml='164px' fontSize='20px'>
                    <Text>
                        DOWNLOAD APP
                    </Text>
                </Box>
                <Box ml='164px' fontSize='16px'>
                <Link>
                    <Flex>
                        <Center>
                            <FaApple size='24px' color="white"/>
                            <FaGooglePlay size='24px' color="white"/>
                        </Center>
                    </Flex>
                </Link>
                </Box>
                
                
            </Box>
            <Spacer/>

        </HStack>
    )
}

export default Footer