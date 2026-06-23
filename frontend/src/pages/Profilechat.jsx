import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { FiArrowLeftCircle } from "react-icons/fi";
import { setSelecteduser } from "../redux/userSlice";
import Friend from "./Friend";
import axios from "axios";
import { serverurl } from "../main";
import { connectSocket, disconnectSocket } from "../socket";

export default function Profilechat() {
  const userInfo = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const reduxSelectedUser = useSelector((state) => state.user.selectedUser);

  const [searchInput, setSearchInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Connect socket when user logs in
  useEffect(() => {
    if (userInfo?._id) {
      const socket = connectSocket(userInfo._id);

      socket.on("newMessage", (newMsg) => {
        setMessages((prev) => {
          const isFromSelectedUser =
            newMsg.sender === reduxSelectedUser?._id ||
            newMsg.sender?._id === reduxSelectedUser?._id;
          if (isFromSelectedUser) {
            return [...prev, newMsg];
          }
          return prev;
        });
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [userInfo?._id]);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Fetch messages when selected user changes
  useEffect(() => {
    if (!reduxSelectedUser?._id) return;

    const fetchMessages = async () => {
      setLoadingMessages(true);

      try {
        const response = await axios.get(
          `${serverurl}/api/sendmessage/${reduxSelectedUser._id}`,
          { withCredentials: true },
        );

        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [reduxSelectedUser]);

  const handleAdd = async () => {
    if (!searchInput.trim()) return;
    setSearchError("");
    try {
      const response = await axios.post(
        `${serverurl}/api/add`,
        { enteremail: searchInput },
        { withCredentials: true },
      );
      const foundUser = response.data;
      const alreadyAdded = friendsList.some((f) => f._id === foundUser._id);
      if (!alreadyAdded) {
        setFriendsList((prev) => [...prev, foundUser]);
      } else {
        setSearchError("Friend already added.");
      }
      setSearchInput("");
    } catch (error) {
      const msg =
        error.response?.data?.msg || "User not found or an error occurred.";
      setSearchError(msg);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !reduxSelectedUser?._id) return;
    try {
      const response = await axios.post(
        `${serverurl}/api/sendmessage/${reduxSelectedUser._id}`, // ✅ receiver in URL
        { message: messageInput }, // ✅ only message in body
        { withCredentials: true },
      );
      setMessages((prev) => [...prev, response.data]);
      setMessageInput("");
    } catch (error) {
      console.error(
        "Failed to send message:",
        error.response?.data || error.message,
      );
    }
  };
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left Panel */}
      <div className="w-1/4 bg-white border-r p-4">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-20 h-20 rounded-full bg-zinc-500"
          />
          <h2 className="mt-2 font-bold">{userInfo?.userName}</h2>
          <p className="text-sm text-gray-500">{userInfo?.email}</p>
        </div>

        <div className="mt-8 flex gap-2">
          <input
            className="border rounded-md w-[200px] h-[40px] pl-2"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Search friend by email"
            type="email"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Add
          </button>
        </div>

        {searchError && (
          <p className="text-red-500 text-xs mt-1">{searchError}</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {friendsList.map((user) => (
            <div
              key={user._id}
              onClick={() => dispatch(setSelecteduser(user))}
              className={`cursor-pointer rounded-xl transition-all duration-200 ${
                reduxSelectedUser?._id === user._id
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <Friend userInfo={user} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="flex flex-col w-full">
        {reduxSelectedUser ? (
          <div className="flex-1 flex flex-col h-screen">
            <div className="flex gap-2 items-center w-full h-[50px] bg-blue-300 pl-5">
              <button onClick={() => dispatch(setSelecteduser(null))}>
                <FiArrowLeftCircle size={28} />
              </button>
              <span className="text-xl">
                {reduxSelectedUser?.userName || "User"}
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {loadingMessages && (
                <p className="text-center text-gray-400 text-sm">
                  Loading messages...
                </p>
              )}

              {!loadingMessages && messages.length === 0 && (
                <p className="text-center text-gray-400 text-sm">
                  No messages yet. Say hi!
                </p>
              )}

              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === userInfo._id ||
                    msg.sender?._id === userInfo._id
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-300"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t flex gap-2 items-center">
              <label className="ml-2">
                <FaPlus />
              </label>
              <label className="ml-3">
                <IoIosMore />
              </label>
              <input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="ml-2 flex-1 border rounded px-3 py-2 text-sm"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome to ChatApp
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
            </div>
            <div className="bg-blue-400 h-[40px] flex justify-center items-center text-white">
              No users are selected
            </div>
          </>
        )}
      </div>
    </div>
  );
}
