import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../redux/userSlice.js";

const Signup = () => {
    const [userName, setuserName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let dispatch = useDispatch();
    let {userData} =useSelector(state=>state.user);
    console.log(userData);
  const  navigate = useNavigate();
  
  const handlerSignup = async (e) => {
    e.preventDefault(); 
            try {
              let result = await axios.post("http://localhost:8000/api/auth/signup",{
                userName:userName,email:email,password:password
              },{
                withCredentials: true
               })
             dispatch(setuserData(result.data))
             console.log(result.data);

            } catch (error) {
              console.log(error);
            }
    
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form
        className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6"
        onSubmit={handlerSignup} // ✅ handle form here
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          SignUp Page
        </h2>

        <p className="text-sm text-center text-gray-500 mt-1">
          Join us and start your journey 🚀
        </p>

        <button
          type="button"
          className="w-full mt-5 py-3 px-4 flex items-center justify-center gap-3 
                     border border-gray-300 rounded-lg bg-white 
                     hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.22 8.27 3.22l6.16-6.16C34.5 2.7 29.7 1 24 1 14.7 1 6.7 6.8 3.3 15.1l7.6 5.9C12.7 14.1 17.9 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.5c-.5 2.6-2 4.8-4.2 6.3l6.5 5c3.8-3.5 6.3-8.7 6.3-15z"/>
            <path fill="#FBBC05" d="M10.9 28.9c-.5-1.5-.8-3.1-.8-4.9s.3-3.4.8-4.9l-7.6-5.9C1.2 16.5 0 20.1 0 24s1.2 7.5 3.3 10.8l7.6-5.9z"/>
            <path fill="#EA4335" d="M24 47c6.5 0 12-2.1 16-5.7l-6.5-5c-1.8 1.2-4.2 1.9-9.5 1.9-6.1 0-11.3-4.6-13.1-10.5l-7.6 5.9C6.7 41.2 14.7 47 24 47z"/>
          </svg>
          <span className="text-gray-700 font-medium">
            Sign up with Google
          </span>
        </button>

        <div className="flex items-center my-5 text-gray-400 text-sm">
          <div className="flex-1 border-t"></div>
          <span className="px-3">Or continue with email</span>
          <div className="flex-1 border-t"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          

          <input
            type="text"
            placeholder="UserName"
            className="p-3 border rounded-lg col-span-2 focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-lg col-span-2 focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-lg col-span-2 focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-2 accent-purple-500" />
          <label className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Terms & Conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-5 py-3 rounded-lg text-white font-medium 
                     bg-gradient-to-r from-indigo-500 to-purple-600 
                     hover:from-indigo-600 hover:to-purple-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <label onClick={()=>navigate('/signin')} className="hover:text-blue-600 hover:font-bold"> Sign in</label>
          
        </p>
      </form>
    </div>
  );
};

export default Signup;

