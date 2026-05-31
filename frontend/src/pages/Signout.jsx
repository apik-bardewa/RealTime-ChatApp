import React from 'react'
import axios from 'axios'
import { serverurl } from '../main'
import { useNavigate } from 'react-router-dom'
function Signout() {

  const navigate = useNavigate()
  const yesHandler = async ()=>{
    let r=await axios.get(`${serverurl}/api/auth/signout`)
    console.log(r);
  }

  const  noHandler =()=>{
    navigate('/');
  }
  return (
    <div className=' h-[100px] w-[300px] ml-[40%] mt-[10%]'>
        <form>
            <label className='text-lg font-bold ml-9'>Do you want to singout ?</label><br></br>
            <div className='flex gap-4 ml-20 mt-4'>
              <button onClick={yesHandler}  type="button" className='bg-blue-500 text-white px-3 py-1 rounded-sm hover:text-lg font-bold'>Yes</button>
              <button onClick={noHandler} type="button" className='bg-blue-500 text-white px-3 py-1 rounded-sm hover:text-md font-bold '>No</button>
            </div>
            
            
        </form>
    </div>
  )
}

export default Signout