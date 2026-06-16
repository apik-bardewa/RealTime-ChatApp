import React from 'react'

function Friend() {
  return (
    <div className='flex gap-2 h-[65px] border rounded-md bg-blue-200 text-black'>
        <div className='w-[40px] h-[50px] '>
            <img
                src="https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"   //real image chai userInfo.image bata aauxa
                alt="Profile"
                className="w-20 h-20 rounded-full bg-zinc-500"
            />
        </div>
        <div className='flex flex-col mt-4 mb-2'>
            <label>@John</label>
            <label>John Bahadur Thapa</label>
        </div>
    </div>
  )
}

export default Friend