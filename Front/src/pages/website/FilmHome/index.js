import React, { useEffect, useState } from "react"
import { Box,  Spacer,  Stack } from '@chakra-ui/react'
import SliderShow from "../../../components/website/SliderShow"
import NowShowingSlider from "../../../components/website/NowShowingSlider"
import ComingSoonSlider from "../../../components/website/ComingSoonSlider"
import axios from "axios"


const FilmHome = (props)=> {
    const listphimdangchieu = []
  const listphimsapchieu = []
  const [listphim, setListphim] = useState([])
  function xulyphim(item, index, arr){
      if(Date.parse((arr[index].time)) <= Date.now()){
          listphimdangchieu.push(arr[index])
      }
      else {
          listphimsapchieu.push(arr[index])
      }
  }
  useEffect(()=>{
      axios.get('http://localhost:8000/api/phims/').
      then(
          res => {
            console.log(res.data)
              setListphim(res.data.map((dataphim)=>{
                  return(
                      {
                          id: dataphim.id,
                          title: dataphim.ten,
                          trailer: dataphim.trailer,
                          imageUrl: dataphim.poster,
                          thumbnail: dataphim.thumbnail,
                          time:dataphim.ngay_chieu,
                          length: dataphim.thoiluong,
                          director:dataphim.dao_dien,
                          actor:dataphim.dien_vien,
                          content:dataphim.tom_tat,
                          finish:dataphim.ngay_ketthuc,
                          theloai:dataphim.theloai,
                          suatchieu:dataphim.suatchieu
                      }
                  )
              }))
          }
      ).catch(error => console.log(error))
    },[])
  
    listphim.forEach(xulyphim);
    return(
        <Box>
            <SliderShow data={listphimdangchieu}/>
            <Stack minH='640px' color='white' bgColor='#1F1D36'  px={50} py={18}>
                <Box>
                <NowShowingSlider data={listphimdangchieu}/>
                </Box>
                <Spacer/><Spacer/>
                <Box>
                <ComingSoonSlider data={listphimsapchieu}/>
                </Box>
               
            </Stack>
        </Box>

    )
}

export default FilmHome