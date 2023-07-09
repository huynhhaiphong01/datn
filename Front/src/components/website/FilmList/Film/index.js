
import { 
    Box,
    Image,
    Button,
    Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PlayTrailer from '../../PlayTrailer'



const Film = (props) => {
    const [style, setStyle] = useState({opacity: 0})
    return(
        <Box
            onMouseLeave={(e) => {setStyle({opacity: 0})}}
            onMouseEnter ={(e) => {setStyle({opacity: 1})}} 
            >
            <Box ml='80px' mt='392px' pos='absolute'>
              {localStorage.getItem('user-info')?
              <Link to='/home/movie-info/lich-chieu' state={{data:props.data.suatchieu, tenphim: props.data.title}}>
              <Button transition='0.7s' style={style} bgColor='rgb(255,0,0,0.5)' mr='10px' colorScheme='red'>Mua vé</Button>
              </Link>
              :<Link to='/login'>
              <Button transition='0.7s' style={style} bgColor='rgb(255,0,0,0.5)' mr='10px' colorScheme='red'>Mua vé</Button>
              </Link>}
                <Link to="/home/movie-info" state={{data:props.data, check:'0'}}>
                <Button  transition='0.7s' style={style} bgColor='rgb(0,0,255,0.5)' colorScheme='blue'>Chi tiết</Button></Link>
            </Box>
            <Box ml='130px' mt='200px' pos='absolute'  
            onClick={(e) => {setStyle({opacity: 0})}} >
                <PlayTrailer styleProp={style} trailerProp={props.data.trailer}/>
            </Box>
            
            <Center>
              <Image w='300px' h='452px' border='2px' 
                src={"http://localhost:8000/"+props.data.imageUrl} borderColor='white'
            />
            </Center>
        
           
        </Box>
    )
}

export default Film