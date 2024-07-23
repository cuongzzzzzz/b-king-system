function UserChatCard({conv,isActive ,handleChooseChat}:any) {
    return (
        <div className= { isActive ?`px-3 flex items-center gap-3 hover:bg-slate-100 border rounded-sm border-blue-600` :`px-3 flex items-center gap-3 hover:bg-slate-100 hover:border rounded-sm hover:border-blue-600`} onClick={()=>{handleChooseChat(conv)}}>
            <div className="w-[40px]">
                <img src="/avatar.webp" alt="" className="border rounded-full" />
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-md font-bold">{conv.participants[0].name}</p>
               <div className="flex justify-between"> <p className="text-sm text-slate-300">online</p>
              {conv.unSeenCount >0 &&  <div className="w-5 h-5 rounded-full bg-red-500 text-center leading-5">{conv.unSeenCount}</div>}
               </div>
            </div>
        </div>
    );
}

export default UserChatCard;