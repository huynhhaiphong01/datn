
import React from "react"
import { 
    SimpleGrid
} from '@chakra-ui/react'
import Film from "./Film"

const FilmList = (props) => {
    const {data} = props
    const List = data.map((item)=>(
        <Film key = {item.id} data = {item} />
    ))

    return(
        <SimpleGrid columns={[2, null, 4]} spacing='40px'>
            {List}
        </SimpleGrid>
    )
}

export default FilmList