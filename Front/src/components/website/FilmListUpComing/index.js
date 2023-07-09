
import React from "react"
import { 
    Box,
    SimpleGrid
} from '@chakra-ui/react'
import FilmUpcoming from "./FilmUpcoming"

const FilmListUpcoming = (props) => {
    const {data} = props
    const List = data.map((item)=>(
        <FilmUpcoming key = {item.id} data = {item} />
    ))

    return(
        <SimpleGrid columns={[2, null, 4]} spacing='40px'>
            {List}
        </SimpleGrid>
    )
}

export default FilmListUpcoming