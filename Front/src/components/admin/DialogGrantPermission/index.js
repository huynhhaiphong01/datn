import React, { useEffect, useRef, useState } from 'react';
import {Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Center,
    Box,
    useToast} from '@chakra-ui/react'
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';

function DialogGrantPermission(props){
    const { isOpen,onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast= useToast()
    const [Permission, setPermission] = useState(props.datauser.permission)
    const [listPermission, setListPermission]=useState([])
    const SelectPermission = val => {
        setPermission(val)
      }


    useEffect(()=>{
     axios.get(`http://localhost:8000/api/permissions`).then(res => {
        console.log(res.data)
        setListPermission(res.data.map((dataPermission)=>{
            return(
                {
                    id: dataPermission.id,
                    name_per: dataPermission.name_per,
                    action: dataPermission.action
                }
            )
              }))

      }).catch(error=>{
            console.log(error)
      })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
    const id_per=[]
    const id_per_spAdmin=[1]
    var check=false
     function xulyPermission(item, index, arr)
      {
        id_per.push(arr[index].id)
        if(arr[index].name_per==="SuperAdmin"){
           check=true
        }
     }
     Permission.forEach(xulyPermission)
    
     if(check){
        axios.put(`http://localhost:8000/api/grantpermissiontouser/${props.datauser.id}`,
        {"permission":id_per_spAdmin})
        .then(res => {
            toast({
                title: 'Successfully!',
                description: "Đã cấp quyền thành công.",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

        }).catch(error=>{
              console.log(error)
        })
     }
     else{
        axios.put(`http://localhost:8000/api/grantpermissiontouser/${props.datauser.id}`,
        {"permission":id_per})
        .then(res => {
            toast({
                title: 'Successfully!',
                description: "Đã cấp quyền thành công.",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

        }).catch(error=>{
              console.log(error)
        })
     }

    }
    return(
    <>
      {
        (JSON.parse(localStorage.getItem('user-info')).action.includes("GrantPermission"))
        ?
        <Button mr='5px' size='sm' colorScheme='blue' onClick={onOpen}>Cấp quyền</Button>
        :
        <Button mr='5px' size='sm' disabled colorScheme='blue' onClick={onOpen}>Cấp quyền</Button>
      }
       <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='md' 
        >
        <AlertDialogOverlay >
          <AlertDialogContent  bgColor='#1F1D36' border='2px' borderColor='#42C2FF'
          alignSelf='center' 
          ><form onSubmit={handleSubmit}>
            <AlertDialogHeader fontSize='2xl' fontWeight='bold'
             color='white' textAlign='center'>
              Cấp quyền
            </AlertDialogHeader>

            <AlertDialogBody color='white'>
              <Box mb='30px' >
             <Center>
              <Multiselect className='mse-permission' 
                placeholder='Chọn quyền' hidePlaceholder='true'
                selectedValues={Permission}
                options={listPermission} showCheckbox='true' displayValue="name_per"
                onSelect={SelectPermission}
                onRemove={SelectPermission}
                avoidHighlightFirstOption='true'
                style={ {chips: { background: "#42C2FF" },
                searchBox: {color:"white", border: "2px solid #42C2FF",  "borderRadius": "10px"}} }
                />
                </Center>
              </Box>
               
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button type='submit' colorScheme='green'  ml={3} onClick={onClose}>
                Xác nhận
              </Button>
            </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
   </>
    )
}



export default DialogGrantPermission;