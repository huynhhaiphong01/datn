import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {SmoothHorizontalScrolling} from '../../../utils'
import { Link } from "react-router-dom";
import PlayTrailer from "../PlayTrailer";
function NowShowingSlider (props){
const MoviesRowContainer = styled.div`
  background-color: #00051D;
  padding: 20px 20px 0;
  position: relative;
  width:100%;
  height:100%;
  .btnLeft{
      transform: translateY(-20%);
      &:hover{
          background-color: rgba(0,0,0,0.8);
      }

      &:hover svg{
          opacity:1;
          transform: scale(1.2);
      }

      svg{
          opacity: 0.7;
          font-size: 50px;
          transition: all 0.3s linear;
      }
  }
  
  .btnRight{
    transform: translateY(-20%);
    &:hover{
        background-color: rgba(0,0,0,0.8);
    }

    &:hover svg{
        opacity:1;
        transform: scale(1.2);
    }

    svg{
        opacity: 0.7;
        font-size: 50px;
        transition: all 0.3s linear;
    }
}
`;

const MoviesSlider=styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(${props.data.length},300px);
  transition: all 0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 28px;
  scroll-behavior: smooth;
  
  &:hover .movieItem{
      opacity:0.5;
  }

  .movieItem{
     transform: scale(1);
     transition: all 0.3s linear;
     transform: center left;

     &:hover {
         opacity: 1;
         transform: scale(1.1);
         z-index: 10;
         .btnGroup{
            opacity: 1;
         }
         .trailer{
             opacity: 1;
         }
     }
     
  }
`;
    const sliderRef = useRef()
    const movieRef=useRef()
    const [dragDown,setDragDown]=useState(0);
    const [dragMove,setDragMove]=useState(0);
    const [isDrag,setIsDrag]=useState(false);
    const handleScrollRight =()=>{
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
        if(sliderRef.current.scrollLeft < maxScrollLeft){
            SmoothHorizontalScrolling(sliderRef.current,
                 250, 
                 movieRef.current.clientWidth*2,
                 sliderRef.current.scrollLeft)
        }
    }
    const handleScrollLeft =()=>{
        if(sliderRef.current.scrollLeft > 0){
            SmoothHorizontalScrolling(sliderRef.current,
                 250, 
                 -movieRef.current.clientWidth*2,
                 sliderRef.current.scrollLeft)
        }
    }
    useEffect(()=>{
        if(isDrag){
            if(dragDown>dragMove) handleScrollRight()
            if(dragDown<dragMove) handleScrollLeft()
        }
    },[dragDown, dragMove, isDrag])
    const onDragStart= e=>{
        setIsDrag(true)
        setDragDown(e.screenX)
    }
    const onDragEnd = e =>{
        setIsDrag(false)
    }
    const onDragEnter = e =>{
        setDragMove(e.screenX)
    }
    return(
        <MoviesRowContainer draggable='false'>
            <Heading mb='10px' fontSize={'28px'} userSelect='none'>PHIM ĐANG CHIẾU</Heading>
            <hr/>
            <MoviesSlider ref={sliderRef} 
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            draggable='true'>
                {
                    props.data.map((movie,index)=>(
                        <Box key={index} className='movieItem' ref={movieRef} w='100%' h='100%' minH='452px'
                        minW='300px' userSelect='none' overflow='hidden' borderRadius='6px'
                        position='relative' draggable='false' border={'2px'} borderColor='white'>
                            <Image src={"http://localhost:8000/"+movie.imageUrl} w='100%' h='100%' objectFit='cover'
                            draggable='false'/>
                            <Text position='absolute' left='0' right='0' bottom='0'
                             p='4px' textAlign='center' fontSize='11px' 
                             bgColor={'rgba(0,0,0,0.65)'}>{movie.title}</Text>
                             <Flex className="btnGroup" opacity={'0'} position={'absolute'} right='10px' bottom='35px'>
                                 
                             {localStorage.getItem('user-info')?
                             <Link to='/home/movie-info/lich-chieu' state={{data:movie.suatchieu, tenphim: movie.title}}>
                                 <Button transition={'0.7s'} mr='7px' colorScheme='red' size='sm' bgColor='rgb(255,0,0,0.5)'>
                                 Mua vé
                             </Button></Link>:
                             <Link to='/login'>
                               <Button transition={'0.7s'} mr='7px' colorScheme='red' size='sm' bgColor='rgb(255,0,0,0.5)'>
                                 Mua vé
                               </Button></Link>}
                                 <Link to='/home/movie-info' state={{data:movie, check:'0'}}>
                                 <Button transition={'0.7s'} colorScheme='blue' size='sm' bgColor='rgb(0,0,255,0.5)'>
                                     Chi tiết
                                 </Button></Link>
                             </Flex>
                             <Box className='trailer' opacity={'0'} position='absolute'
                               top={'40%'} left='41%'>
                                 <PlayTrailer trailerProp={movie.trailer}/>
                             </Box>
                        </Box>
                    ))
                }
            </MoviesSlider>
            <Box className="btnLeft" position='absolute' top='50%' left='30px' zIndex='20' transformOrigin='center'
            cursor='pointer' bgColor={'rgba(0,0,0,0.5)'} h='100px' w='50px' borderRadius={'4px'}
            display='flex' alignItems='center' onClick={handleScrollLeft}
            visibility={props.data.length<5?"hidden":""}>
                <FiChevronLeft/>
            </Box>
            <Box className="btnRight" position='absolute' top='50%' right='30px' zIndex='20' transformOrigin='center'
            cursor='pointer' bgColor={'rgba(0,0,0,0.5)'} h='100px' w='50px' borderRadius={'4px'}
            display='flex' alignItems='center' onClick={handleScrollRight} 
            visibility={props.data.length<5?"hidden":""}>
                <FiChevronRight/>
            </Box>
        </MoviesRowContainer>
    )
    
}

export default NowShowingSlider;

