import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { setuserData } from '../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SignIn() {
   let navigate= useNavigate();
   let dispatch = useDispatch();
    const [email, setemail] = useState('');
     const [password, setpassword] = useState('');
    // let {userData} = useSelector(state=>state.user.userData);
    // console.log(userData);
  const signinHandler = async (e) => {
    e.preventDefault();
     try {
              let result = await axios.post("http://localhost:8000/api/auth/signin",{
                email,password
              },{
                withCredentials: true
               })
              //  const { password, ...safeUser } = result.data;
              dispatch(setuserData(result.data));
              console.log(result.data);

            navigate('/dashboard')
            } catch (error) {
              console.log(error);
            }
};
  return (
    <div className='flex justify-center mt-2'>
    <div className=" bg-blue-300 rounded-xl border border-gray-200 py-8 px-6 max-w-90 w-full">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
      </div>
  
      <h3 className="mb-6 text-center text-xl font-bold text-gray-800">Quick Login</h3>
  
      <form onSubmit={signinHandler}>
          <div className="mb-4">
              <label className="mb-1 block text-lg font-medium text-zinc-800">Email</label>
              <input value={email} onChange={(e)=>setemail(e.target.value)}  type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" required="" />
          </div>
  
          <div className="mb-6">
              <label className="mb-1 block text-lg font-medium text-zinc-800">Password</label>
              <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" required="" />
          </div>
  
          <button type="submit" className="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-600">Sign In</button>
  
          <div className="mt-4 text-center">
              <a href="/send-otp" className="text-lg text-blue-800 hover:font-bold">Forgot Password?</a>
          </div>
      </form>
    </div>
  </div>
  )
}

export default SignIn