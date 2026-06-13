import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function App() {
  const userInfo = useSelector(state=>state.user.userData)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "other" },
    { id: 2, text: "Hi, how are you?", sender: "me" },
  ]);

  const [input, setInput] = useState("");

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
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 flex flex-col">

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
          <div>
            <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-[100px] flex-1 border rounded px-3 py-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}