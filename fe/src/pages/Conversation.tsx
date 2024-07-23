import  { useEffect, useState, ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserChatCard from "@/components/UserChatCard";
import Add from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useSocket } from '@/context/SocketContext';
import { updateReceiverId } from '@/redux/chatSlice';
import ChatBuble from '@/components/ChatBuble';

interface UserInfo {
  _id: string;
}

interface Message {
  sendBy: string;
  text: string;
}

interface Conversation {
  _id: string;
  messages: Message[];
}

interface RootState {
  auth: {
    login: {
      currentUser: UserInfo;
    };
  };
  chat: {
    receiverId: string;
  };
 
}

function Conversation() {
  const userInfo = useSelector((state: RootState) => state.auth.login.currentUser);
  const receiverId = useSelector((state: RootState) => state.chat.receiverId);
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);
  const socket= useSocket()
  const dispatch = useDispatch()
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
 
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (socket && userInfo) {
      socket.emit("sendMessage", {
        senderId: userInfo._id,
        text: message,
        conversationId: currentConversation?._id,
        receiverId
      });
      socket.emit("seen",{conversationId:currentConversation?._id,currentUserId:userInfo._id})
      setMessage("");
    }
  };

  const handleChooseChat = (conv: Conversation) => {
    // console.log(conv)
    dispatch(updateReceiverId(conv.participants[0]._id))

    setCurrentConversation(conv); 
  };
  // useEffect(() => {
  //   const handleKeydown = (e: KeyboardEvent) => {
  //     if (e.code === "Enter") {
  //       handleSendMessage();
  //     }
  //   };
  
  //   window.addEventListener("keydown", handleKeydown);
  
  //   return () => {
  //     window.removeEventListener("keydown", handleKeydown);
  //   };
  // }, []);

  useEffect(() => { 
    if (socket && currentConversation?._id) {
      socket.emit("loadMessages", { 
        conversationId: currentConversation._id, 
        senderId: userInfo._id 
      });
      socket.emit("seen",{conversationId:currentConversation?._id,currentUserId:userInfo._id})
    }
  }, [currentConversation?._id, socket, userInfo._id]); 
 
  useEffect(() => {
   
    if (socket && userInfo) {

      
      socket.emit("chatPage", { currentUserId: userInfo._id, receiverId });
      
      socket.on("conversations", (data) => {
        // console.log(data)
        setAllConversations(data.allConversations);
      });
      console.log(userInfo)

      socket.on("getMessages",(data)=>{
        setMessages(data)
      })
      socket.on("newMessage", (data)=>{
        setMessages(data)
      }); 
      return () => {
        socket.off("conversations");
        socket.off("newMessage");
        socket.off("getMessages")
      };
    }
  }, [socket, userInfo, receiverId]);
// console.log(messages)
  return (
    <div className="container mx-auto">
      <div className="flex p-3">
        <div className="w-3/12 font-bold text-2xl">Message</div>
        <div className="w-9/12 px-3 flex items-center gap-3">
         {currentConversation && <> <div className="w-[40px]">
            <img src="/avatar.webp" alt="" className="border rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
          <p className="text-md font-bold">{currentConversation?.participants[0]?.name}</p>
          <p className="text-sm text-slate-300">online</p>
            
          </div></>}
        </div>
      </div>
      <div className="flex p-3 border-t">
        <div className="w-1/4 flex flex-col border-r">
          {allConversations.map((conv) => (
            <UserChatCard
              key={conv._id}
              conv={conv}
              handleChooseChat={handleChooseChat}
              isActive={conv._id === currentConversation?._id}
            />
          ))}
        </div>
        <div className="w-3/4 h-[calc(100lvh-64px-76px-20px)] pb-10 relative">
          <div className=" h-full w-full flex flex-col overflow-auto px-2 gap-1"  ref={messagesEndRef}>
            {messages.map((msg, index) => (
             <ChatBuble message={msg} key={index} currentUserId={userInfo._id}/>
            ))}
          </div>
          {currentConversation ? <div className="absolute p-3 flex items-center bottom-0 h-10 w-full bg-white">
            <Add />
            <input
              onChange={onChangeInput}
              type="text"
              className="outline-none grow px-5"
              placeholder="text here"
              value={message}
            />
            <div onClick={handleSendMessage}>
              <SendIcon className="text-blue-500" />
            </div>
          </div> : <p className='  absolute top-[50%] left-[50%] translate-x-[-50%]  text-center text-xl leading-10'>Chọn cuộc hội thoại để tiếp tục</p>  }
        </div>
      </div>
    </div>
  );
}

export default Conversation;
