import React from 'react'

function Nav() {
  return (
    <div className='bg-blue-200 text-black'>
        <div className='flex justify-between px-5'>
            <label>Chat-App</label>
            <div className='flex gap-5'>
                <label className='hover:font-bold '><a href='/signup'>SignUp</a></label>
                <label className='hover:font-bold '><a href='/signin'>SignIn</a></label>
                <label className='hover:font-bold '><a href='/about'>About</a></label>
            </div>
        </div>
    </div>
  )
}

export default Nav