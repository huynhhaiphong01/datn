import {
  Center, HStack, Image, Flex, Radio, RadioGroup, Link
} from '@chakra-ui/react'

import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import { useState, useEffect } from 'react'

const SliderShow = (props) => {
    const [id, setId] = useState(0);
    function autoCount() {
        if(id>=9) {
            setId(0)
        }
        else {
            setId(id + 1)
        }
    }
    function handleClickRight() {
        if(id<9){
            setId(id+1)
        }
        else{
            setId(0)
        }
    }
    function handleClickLeft() {
        if(id!==0){
            setId(id-1)
        }
        else {
            setId(9)
        }
    }
    useEffect(
        () => {
            let time = setInterval(autoCount, 4000)
            return () => clearInterval(time)
        },
    );
    return(
        <Center bgColor='#00051D'>
            <Flex w='1090px' h='572px' overflow='hidden'>
                {props.data.map(phim=>(
                    <Link>
                     <Image
                    src= {"http://localhost:8000/" + phim.thumbnail}
                    ml = {id===1 ? '-100%'
                                : id===2 ?
                                '-200%': id===3 ? '-300%':
                                id===4 ? '-400%':
                                id===5 ? '-500%':
                                id===6 ? '-600%':
                                id===7 ? '-700%': 
                                id===8 ? '-800%':
                                id===9 ? '-900%': '0%'}
                    minW='1090px'
                    objectFit='cover'
                    h='572px'
                    transition='2s'
                    id={phim.id}
                />
                    </Link>
                ))}
            </Flex>
            <RadioGroup mt='500px' pos='absolute' color='white' value={id}>
                <HStack>
                    <Radio value={0} onClick={(e)=> {setId(0)}}></Radio>
                    <Radio value={1} onClick={(e)=> {setId(1)}}></Radio>
                    <Radio value={2} onClick={(e)=> {setId(2)}}></Radio>
                    <Radio value={3} onClick={(e)=> {setId(3)}}></Radio>
                    <Radio value={4} onClick={(e)=> {setId(4)}}></Radio>
                    <Radio value={5} onClick={(e)=> {setId(5)}}></Radio>
                    <Radio value={6} onClick={(e)=> {setId(6)}}></Radio>
                    <Radio value={7} onClick={(e)=> {setId(7)}}></Radio>
                    <Radio value={8} onClick={(e)=> {setId(8)}}></Radio>
                    <Radio value={9} onClick={(e)=> {setId(9)}}></Radio>
                </HStack>
            </RadioGroup>
            <HStack spacing={950} pos='absolute' color='white'>
                <ArrowBackIcon
                    onClick={handleClickLeft}
                    cursor='pointer'
                    boxSize='48px'
                />
                <ArrowForwardIcon
                    onClick={handleClickRight}
                    cursor='pointer' 
                    boxSize='48px'
                />
            </HStack>
        </Center>
    )
}

export default SliderShow