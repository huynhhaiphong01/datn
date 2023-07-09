import React, { useState } from 'react';
import ShowDataMovies from '../../../components/admin/ShowDataMovies';

function Film(props) {
       const [message,setMessage]= useState('')
       const callbackFunction = (childData) => {
        setMessage(childData)
       }
       if(message==="Update"){
           props.parentCallback(message)
           setMessage("wait update")
       }
        return (
            <ShowDataMovies parentCallback={callbackFunction}/>
        );
}


export default Film;