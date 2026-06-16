import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { FiArrowLeftCircle } from "react-icons/fi";
import { setSelecteduser } from "../redux/userSlice";


export default function App() {
  const userInfo = useSelector(state=>state.user.userData)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "other" },
    { id: 2, text: "Hi, how are you?", sender: "me" },
  ]);

  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const  reduxSelectedUser = useSelector(state=>state.user.selectedUser)
const reduxOtherUserdata = useSelector(state=>state.user.otherUserdata)

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { id: Date.now(), text: input, sender: "me" },
    ]);

    setInput("");
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {/* Left Panel */}
      <div className="w-1/4 bg-white border-r p-4">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/100"   //real image chai userInfo.image bata aauxa
            alt="Empty"
            className="w-20 h-20 rounded-full bg-zinc-500"
          />
          <h2 className="mt-2 font-bold">{userInfo.userName}</h2>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>
        {/* when user click on this button then selected user  info will updateed */}
      <div className="mt-10 flex flex-col gap-5">{reduxOtherUserdata?.map((user)=>(
           <div onClick={()=>dispatch(setSelecteduser(user))} className='flex gap-2 h-[65px] border rounded-md bg-blue-200 text-black'>
          <div className='w-[40px] h-[50px] '>
              <img
                  src={reduxSelectedUser?.image || "https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"}   //real image chai userInfo.image bata aauxa
                  alt="Profile"
                  className="w-20 h-20 rounded-full bg-zinc-500"
              />
          </div>
          <div className='flex flex-col mt-4 mb-2'>
              <label>{reduxOtherUserdata.userName}</label>
              <label>{reduxOtherUserdata.email}</label>
          </div>
        </div>
      )
      )}</div>
      </div>

      {/* Right Chat Panel */}
      {reduxSelectedUser && <div className="flex-1 flex flex-col">
        <div className="flex  gap-2 w-full h-[50px] bg-blue-300 rounded-mdp pl-5 pt-3">
           <label><FiArrowLeftCircle size={30} /></label>
           <label className="text-xl">{reduxSelectedUser?.userName || "user"}</label>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-300"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t flex gap-2">
          <div className="flex">
            <label className="ml-2 mt-2"><FaPlus /></label>
            <label className="ml-5 mt-2"><IoIosMore /></label>

          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-[10px] flex-1 border rounded px-3 py-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

      </div>}

      {!reduxSelectedUser && <div className="flex ml-[30%] flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to our ChatApp 
        </h1>
      
        <p className="mt-3 text-gray-600">
          Connect and chat with friends in real time.
        </p>
      
        <p className="mt-2 text-gray-500">
          Fast, secure, and always connected.
        </p>
      
        <p className="mt-4 text-sm text-gray-400">
          Thank you for your trust 
        </p>
      </div>}
    </div>
  );
}