function ChatBuble(
    {message,currentUserId}:{message:any,currentUserId:any}
) {
    return ( 
        <div className={currentUserId === message.senderId ? "w-full flex justify-end ":" w-full flex justify-start"}>
           <div className={currentUserId === message.senderId ? "p-3 border rounded-sm max-w-[70%] bg-blue-100":"p-3 border rounded-sm max-w-[70%] bg-white"}>
             {message.text}
           </div>
        </div>
     );
}

export default ChatBuble;