import React,  { useState }  from 'react';
import ShowDataCategory from '../../../components/admin/ShowDataCategory';

function Category(props) {
        const [message,setMessage]= useState('')
        const callbackFunction = (childData) => {
        setMessage(childData)
        }
        if(message==="Update"){
            props.parentCallback(message)
            setMessage("wait update")
        }
        return (
            <ShowDataCategory parentCallback={callbackFunction}/>
        );
}


export default Category;