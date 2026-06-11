import axios from 'axios'
import React, { useEffect } from 'react'
import { serverurl } from '../../main'
import { useDispatch, useSelector } from 'react-redux'
import { setuserData } from '../../redux/userSlice'

function getCurrentUser(){
    let dispatch = useDispatch();
    let {userData} = useSelector(state=>state.user);
    useEffect(() => {
      const fetchUser = async()=>{
            try {
                let result =await axios.get(`${serverurl}/api/user/current`,{withCredentials:true})
                dispatch(setuserData(result.data));
            } catch (error){
                console.log("current user error detected :",error);
            }
        }
        fetchUser()
    }, [userData]) 
}

export default getCurrentUser;