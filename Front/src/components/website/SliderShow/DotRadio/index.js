
import React from "react"
import { Box, Input, useRadio } from "@chakra-ui/react"

const DotRadio = () => {
    return(
        <Box as='label'>
            <Box
                cursor='pointer'
                borderWidth='1px'
                borderRadius='50%'
                borderColor='#42C2FF'
                _checked={{
                    bg: '#42C2FF',
                }}
                _hover={{
                    bg: '#42C2FF',
                }}
                boxSize='12px'
            />
        </Box>
    )
}

export default DotRadio